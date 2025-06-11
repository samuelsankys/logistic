import { Agendamento, AgendamentoStatus } from "../models/agendamento";
import { addDays } from "date-fns";
import {
  CriarAgendamentoDTO,
  CriarAgendamentoService,
} from "../services/agendamento/criarAgendamentoService";
import { IAgendamentoRepository } from "../repositories/agendamentoRepository.interface";

describe("Criar Agendamento Service", () => {
  let sut: CriarAgendamentoService;

  let agendamentoRepository: jest.Mocked<IAgendamentoRepository>;

  beforeEach(() => {
    agendamentoRepository = {
      criar: jest.fn(),
      getDataHora: jest.fn(),
      getAtrasadosOuPendentesPorMotorista: jest.fn(),
    };
    sut = new CriarAgendamentoService(agendamentoRepository);
  });

  it("Deve criar um novo agendamento", async () => {
    const hoje = new Date();
    const inputAgendamento: CriarAgendamentoDTO = {
      motoristaNome: "João",
      motoristaCpf: "12345678900",
      placaCaminhao: "ABC-1234",
      numeroContrato: "CT123",
      dataHora: hoje.toISOString(),
    };

    agendamentoRepository.criar.mockResolvedValueOnce(
      new Agendamento(
        hoje.toISOString(),
        "CT123",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.pendente,
        "1"
      )
    );

    const novoAgendamento = await sut.execute(inputAgendamento);
    expect(novoAgendamento.dataHora).toEqual(
      new Date(inputAgendamento.dataHora)
    );
    expect(novoAgendamento.numeroContrato).toBe(
      inputAgendamento.numeroContrato
    );
    expect(novoAgendamento.motoristaNome).toBe(inputAgendamento.motoristaNome);
    expect(novoAgendamento.motoristaCpf).toBe(inputAgendamento.motoristaCpf);
    expect(novoAgendamento.placaCaminhao).toBe(inputAgendamento.placaCaminhao);
    expect(novoAgendamento.status).toBe(AgendamentoStatus.pendente);
  });

  it.only("Não deve permitir agendamento se o motorista tem um agendamento pendente ou atrasado", async () => {
    const hoje = new Date();
    const inputAgendamento: CriarAgendamentoDTO = {
      motoristaNome: "João",
      motoristaCpf: "12345678900",
      placaCaminhao: "ABC-1234",
      numeroContrato: "CT123",
      dataHora: hoje.toISOString(),
    };

    agendamentoRepository.getAtrasadosOuPendentesPorMotorista.mockResolvedValueOnce(
      [
        new Agendamento(
          hoje.toISOString(),
          "CT123",
          "João",
          "12345678900",
          "ABC-1234",
          AgendamentoStatus.pendente,
          "1"
        ),
      ]
    );

    expect(sut.execute(inputAgendamento)).rejects.toThrow(
      "Foi encontrado agendamentos pendentes/atrasados"
    );
  });

  // it("Não deve permitir agendamento de dois motoristas no mesmo horário", () => {
  //   criarAgendamento(agendamento);
  //   const outroAgendamento = {
  //     ...agendamento,
  //     id: "2",
  //     motoristaCpf: "98765432100",
  //   };
  //   expect(() => criarAgendamento(outroAgendamento)).toThrow(
  //     "Conflito de agendamento"
  //   );
  // });

  //   it("Deve alterar o status de um agendamento", () => {
  //     criarAgendamento(agendamento);
  //     const atualizado = alterarStatus(agendamento.id, "concluido");
  //     expect(atualizado.status).toBe("concluido");
  //   });

  //   it("Não deve permitir cancelar um agendamento concluído", () => {
  //     criarAgendamento(agendamento);
  //     alterarStatus(agendamento.id, "concluido");
  //     expect(() => alterarStatus(agendamento.id, "cancelado")).toThrow(
  //       "Não é possível cancelar um agendamento já concluído"
  //     );
  //   });

  //   it("Não deve permitir alterar um agendamento cancelado", () => {
  //     criarAgendamento(agendamento);
  //     alterarStatus(agendamento.id, "cancelado");
  //     expect(() => alterarStatus(agendamento.id, "concluido")).toThrow(
  //       "Não é possível alterar um agendamento cancelado"
  //     );
  //   });
});
