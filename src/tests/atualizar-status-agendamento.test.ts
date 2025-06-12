import { Agendamento, AgendamentoStatus } from "../models/agendamento";
import { addDays } from "date-fns";
import {
  CriarAgendamentoDTO,
  CriarAgendamentoService,
} from "../services/agendamento/criarAgendamentoService";
import { IAgendamentoRepository } from "../repositories/agendamentoRepository.interface";
import {
  AtualizarStatusAgendamentoDTO,
  AtualizarStatusAgendamentoService,
} from "../services/agendamento/atualizarStatusAgendamentoService";

describe("Atualizar Agendamento Service", () => {
  let sut: AtualizarStatusAgendamentoService;

  let agendamentoRepository: jest.Mocked<IAgendamentoRepository>;

  beforeEach(() => {
    agendamentoRepository = {
      criar: jest.fn(),
      getDataHora: jest.fn(),
      getAtrasadosOuPendentesPorMotorista: jest.fn(),
      buscarPorId: jest.fn(),
      update: jest.fn(),
    };

    sut = new AtualizarStatusAgendamentoService(agendamentoRepository);

    agendamentoRepository.buscarPorId.mockResolvedValue(
      new Agendamento(
        new Date().toISOString(),
        "CT123",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.pendente,
        "1"
      )
    );
  });

  it("Não deve permitir alterar o status de um agendamento para pendente", () => {
    const input: AtualizarStatusAgendamentoDTO = {
      id: "1",
      status: AgendamentoStatus.pendente,
    };

    expect(sut.execute(input)).rejects.toThrow(
      "Não é possível alterar o agendamento com esse status"
    );
  });

  it("Não permite continuar por não encontrar o agendamento", async () => {
    const input: AtualizarStatusAgendamentoDTO = {
      id: "1",
      status: AgendamentoStatus.concluido,
    };

    agendamentoRepository.buscarPorId.mockResolvedValueOnce(null);

    expect(sut.execute(input)).rejects.toThrow("Agendamento nao encontrado");
  });

  it("Deve permitir alterar o status de um agendamento", async () => {
    const input: AtualizarStatusAgendamentoDTO = {
      id: "1",
      status: AgendamentoStatus.concluido,
    };

    const agendamento = await sut.execute(input);
    expect(agendamento.status).toBe(AgendamentoStatus.concluido);
    expect(agendamentoRepository.update).toHaveBeenCalled();
  });

  it("Não deve permitir cancelar um agendamento concluído", async () => {
    const input: AtualizarStatusAgendamentoDTO = {
      id: "1",
      status: AgendamentoStatus.cancelado,
    };
    agendamentoRepository.buscarPorId.mockResolvedValueOnce(
      new Agendamento(
        new Date().toISOString(),
        "CT123",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.concluido,
        "1"
      )
    );

    expect(sut.execute(input)).rejects.toThrow(
      "Não é possível alterar o agendamento concluido"
    );
  });

  it("Não deve permitir alterar um agendamento cancelado", () => {
    const input: AtualizarStatusAgendamentoDTO = {
      id: "1",
      status: AgendamentoStatus.atrasado,
    };
    agendamentoRepository.buscarPorId.mockResolvedValueOnce(
      new Agendamento(
        new Date().toISOString(),
        "CT123",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.cancelado,
        "1"
      )
    );

    expect(sut.execute(input)).rejects.toThrow(
      "Não é possível alterar o agendamento cancelado"
    );
  });
});
