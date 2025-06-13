import request, { Response } from "supertest";
import app from "../../index";
import { db } from "../../shared/database/db";
import { agendamentos } from "../../shared/database/schema";
import { eq } from "drizzle-orm";

let createdId: number;
describe("CriarAgendamentoController E2E", () => {
  it("deve criar um agendamento com sucesso", async () => {
    let response: Response;
    response = await request(app).post("/api/agendamentos").send({
      dataHora: "2025-07-01T10:00:00Z",
      numeroContrato: "123456",
      motoristaNome: "João Silva",
      motoristaCpf: "12345678900",
      placaCaminhao: "ABC-1234",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.status).toBe("pendente");

    createdId = response.body.id;
  });

  it("deve retornar erro ao criar um agendamento", async () => {
    let response: Response;
    response = await request(app).post("/api/agendamentos").send({
      dataHora: "2025-07-01T10:00:00Z",
      numeroContrato: "123456",
      motoristaNome: "João Silva",
      motoristaCpf: "12345678900",
      placaCaminhao: "ABC-1234",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Foi encontrado agendamentos pendentes/atrasados"
    );
  });

  afterAll(async () => {
    if (createdId) {
      await db.delete(agendamentos).where(eq(agendamentos.id, createdId));
    }
  });
});
