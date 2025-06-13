import { ListarAgendamentoDTO } from "../controllers/listarAgendamentoController";
import { Agendamento, AgendamentoStatus } from "../models/agendamento";
import { IAgendamentoRepository } from "../repositories/agendamentoRepository.interface";
import { ListarAgendamentoService } from "../services/agendamento/listarAgendamentoService";

describe("Listar Agendamento Service - Filtros", () => {
  let sut: ListarAgendamentoService;

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
        new Date("2024-09-15T10:00:00Z").toISOString(),
        "CT123",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.pendente,
        "1"
      ),
      new Agendamento(
        new Date("2024-09-16T11:00:00Z").toISOString(),
        "CT456",
        "Pedro",
        "98765432100",
        "XYZ-5678",
        AgendamentoStatus.concluido,
        "2"
      ),
      new Agendamento(
        new Date("2024-09-17T12:00:00Z").toISOString(),
        "CT789",
        "João",
        "12345678900",
        "ABC-1234",
        AgendamentoStatus.atrasado,
        "3"
      ),
    ]);
    sut = new ListarAgendamentoService(agendamentoRepository);
  });

  it("Deve listar todos os agendamentos sem filtro", async () => {
    const lista = await sut.execute({ filtro: {}, paginacao: {} });
    expect(lista.length).toBe(3);
  });
});
