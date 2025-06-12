import { Agendamento, AgendamentoStatus } from "../models/agendamento";
import { IAgendamentoRepository } from "../repositories/agendamentoRepository.interface";
import { RemoverAgendamentoService } from "../services/agendamento/removerAgendamentoService";
import { addDays } from "date-fns";

describe("Agendamento Service - Remover Agendamentos Antigose", () => {
  let sut: RemoverAgendamentoService;
  let agendamentoRepository: jest.Mocked<IAgendamentoRepository>;

  beforeEach(() => {
    agendamentoRepository = {
      criar: jest.fn(),
      getDataHora: jest.fn(),
      getAtrasadosOuPendentesPorMotorista: jest.fn(),
      buscarPorId: jest.fn(),
      update: jest.fn(),
      busqueComFiltro: jest.fn(),
      removerPorId: jest.fn(),
    };

    agendamentoRepository.busqueComFiltro.mockResolvedValue([
      new Agendamento(
        addDays(new Date(), -4).toISOString(),
        "CT123",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.pendente,
        "1"
      ),
      new Agendamento(
        addDays(new Date(), -2).toISOString(),
        "CT456",
        "Pedro",
        "98765432100",
        "XYZ-5678",
        AgendamentoStatus.concluido,
        "2"
      ),
      new Agendamento(
        new Date().toISOString(),
        "CT789",
        "Maria",
        "11122233344",
        "JKL-9101",
        AgendamentoStatus.atrasado,
        "3"
      ),
    ]);

    sut = new RemoverAgendamentoService(agendamentoRepository);
  });

  it("Deve remover agendamentos com mais de 3 dias", async () => {
    await sut.execute();

    expect(agendamentoRepository.removerPorId).toHaveBeenCalledTimes(1);
    expect(agendamentoRepository.removerPorId).toHaveBeenCalledWith("1");
    expect(agendamentoRepository.busqueComFiltro).toHaveBeenCalledTimes(1);
  });
});
