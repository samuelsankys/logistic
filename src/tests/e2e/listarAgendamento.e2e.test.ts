import request, { Response } from "supertest";
import app from "../../index";
import { db } from "../../shared/database/db";
import { agendamentos } from "../../shared/database/schema";
import { eq } from "drizzle-orm";
import { Agendamento } from "../../models/agendamento";

const createdId: string[] = [];
describe("ListarAgendamentoController E2E", () => {
  beforeAll(async () => {
    const inputs = [
      {
        dataHora: "2025-07-03T10:00:00Z",
        numeroContrato: "123456",
        motoristaNome: "João Silva",
        motoristaCpf: "12345678900",
        placaCaminhao: "ABC-1234",
      },
      {
        dataHora: "2025-07-03T14:00:00Z",
        numeroContrato: "123456",
        motoristaNome: "Gomes",
        motoristaCpf: "12343085900",
        placaCaminhao: "ABC-1464",
      },
      {
        dataHora: "2025-07-02T11:00:00Z",
        numeroContrato: "CT456",
        motoristaNome: "Pedro",
        motoristaCpf: "98765432100",
        placaCaminhao: "XYZ-5678",
      },
    ];
    for (const input of inputs) {
      const resposta = await request(app).post("/api/agendamentos").send(input);
      createdId.push(resposta.body.id);
    }
  });

  it("deve listar todos os agendamentos", async () => {
    let response: Response = await request(app).get("/api/agendamentos");

    const agendamentosCriados = response.body.filter((a: Agendamento) =>
      createdId.includes(a.id + "")
    );

    expect(response.status).toBe(200);
    expect(agendamentosCriados.length).toBe(3);
  });

  it("Deve filtrar agendamentos por status", async () => {
    let response: Response = await request(app).get(
      "/api/agendamentos?status=pendente"
    );

    const agendamentosCriados = response.body.filter((a: Agendamento) =>
      createdId.includes(a.id + "")
    );

    expect(response.status).toBe(200);
    expect(agendamentosCriados.length).toBe(3);
  });

  it("Não Deve filtrar encontrar agendamentos por status concluido", async () => {
    let response: Response = await request(app).get(
      "/api/agendamentos?status=concluido"
    );

    const agendamentosCriados = response.body.filter((a: Agendamento) =>
      createdId.includes(a.id + "")
    );

    expect(response.status).toBe(200);
    expect(agendamentosCriados.length).toBe(0);
  });

  it("Deve filtrar agendamentos por motorista (CPF)", async () => {
    let response: Response = await request(app).get(
      "/api/agendamentos?motoristaCpf=98765432100"
    );

    const agendamentosCriados = response.body.filter((a: Agendamento) =>
      createdId.includes(a.id + "")
    );

    expect(response.status).toBe(200);
    expect(agendamentosCriados.length).toBe(1);
  });

  it(" Deve filtrar agendamentos por dia, status e motorista ao mesmo tempo", async () => {
    let response: Response = await request(app).get(
      "/api/agendamentos?status=pendente&data=2025-07-03&motoristaCpf=12343085900"
    );

    const agendamentosCriados = response.body.filter((a: Agendamento) =>
      createdId.includes(a.id + "")
    );

    expect(response.status).toBe(200);
    expect(agendamentosCriados.length).toBe(1);
  });

  it(" Deve filtrar agendamentos por dia específico", async () => {
    let response: Response = await request(app).get(
      "/api/agendamentos?data=2025-07-03"
    );

    const agendamentosCriados = response.body.filter((a: Agendamento) =>
      createdId.includes(a.id + "")
    );

    expect(response.status).toBe(200);
    expect(agendamentosCriados.length).toBe(2);
  });

  afterAll(async () => {
    if (createdId?.length > 0) {
      for (const id of createdId) {
        await db.delete(agendamentos).where(eq(agendamentos.id, +id));
      }
    }
  });
});
