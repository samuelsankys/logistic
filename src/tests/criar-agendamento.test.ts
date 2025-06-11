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
      buscarPorId: jest.fn(),
      update: jest.fn(),
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

  it("Não deve permitir agendamento se o motorista tem um agendamento pendente ou atrasado", async () => {
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

  it("Não deve permitir agendamento de dois motoristas no mesmo horário", () => {
    const hoje = new Date();
    const inputAgendamento: CriarAgendamentoDTO = {
      motoristaNome: "Pedro",
      motoristaCpf: "43221545232",
      placaCaminhao: "any_placa",
      numeroContrato: "any_contract_number",
      dataHora: hoje.toISOString(),
    };

    agendamentoRepository.getDataHora.mockResolvedValueOnce([
      new Agendamento(
        hoje.toISOString(),
        "CT123",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.pendente,
        "1"
      ),
    ]);

    expect(sut.execute(inputAgendamento)).rejects.toThrow(
      "Conflito de agendamento"
    );
  });
});
