import { Agendamento, AgendamentoStatus } from "../models/agendamento";
import { CriarAgendamentoDTO } from "../services/agendamento/criarAgendamentoService";
import { IAgendamentoRepository } from "../repositories/agendamentoRepository.interface";
import {
  ListarAgendamentoDTO,
  ListarAgendamentoService,
} from "../services/agendamento/listarAgendamentoService";

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
    const lista = await sut.execute({} as ListarAgendamentoDTO);
    expect(lista.length).toBe(3);
  });

  // 	it("Deve filtrar agendamentos por dia específico", () => {
  // 		const agendamentos = listarAgendamentos(new Date("2024-09-15"));
  // 		expect(agendamentos.length).toBe(1);
  // 		expect(agendamentos[0].id).toBe("1");
  // 	});

  // 	it("Deve filtrar agendamentos por status", () => {
  // 		const agendamentosPendente = listarAgendamentos(undefined, "pendente");
  // 		expect(agendamentosPendente.length).toBe(1);
  // 		expect(agendamentosPendente[0].status).toBe("pendente");

  // 		const agendamentosConcluido = listarAgendamentos(undefined, "concluido");
  // 		expect(agendamentosConcluido.length).toBe(1);
  // 		expect(agendamentosConcluido[0].status).toBe("concluido");
  // 	});

  // 	it("Deve filtrar agendamentos por motorista (CPF)", () => {
  // 		const agendamentosMotorista = listarAgendamentos(
  // 			undefined,
  // 			undefined,
  // 			"12345678900"
  // 		);
  // 		expect(agendamentosMotorista.length).toBe(2);
  // 		expect(agendamentosMotorista[0].motoristaCpf).toBe("12345678900");
  // 		expect(agendamentosMotorista[1].motoristaCpf).toBe("12345678900");
  // 	});

  // 	it("Deve filtrar agendamentos por dia, status e motorista ao mesmo tempo", () => {
  // 		const agendamentos = listarAgendamentos(
  // 			new Date("2024-09-17"),
  // 			"atrasado",
  // 			"12345678900"
  // 		);
  // 		expect(agendamentos.length).toBe(1);
  // 		expect(agendamentos[0].id).toBe("3");
  // 	});
  // });
});
