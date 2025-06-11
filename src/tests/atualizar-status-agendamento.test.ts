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
    };
    sut = new AtualizarStatusAgendamentoService(agendamentoRepository);
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

  // it("Deve alterar o status de um agendamento", () => {
  //   const input: AtualizarStatusAgendamentoDTO = {
  //     id: "1",
  //     status: AgendamentoStatus.concluido,
  //   };
  //   sut.execute(input);
  // });
  // 	it("Não deve permitir cancelar um agendamento concluído", () => {
  // 		criarAgendamento(agendamento);
  // 		alterarStatus(agendamento.id, "concluido");
  // 		expect(() => alterarStatus(agendamento.id, "cancelado")).toThrow(
  // 			"Não é possível cancelar um agendamento já concluído"
  // 		);
  // 	});
  // 	it("Não deve permitir alterar um agendamento cancelado", () => {
  // 		criarAgendamento(agendamento);
  // 		alterarStatus(agendamento.id, "cancelado");
  // 		expect(() => alterarStatus(agendamento.id, "concluido")).toThrow(
  // 			"Não é possível alterar um agendamento cancelado"
  // 		);
  // 	});

  // it("Não deve permitir agendamento se o motorista tem um agendamento pendente ou atrasado", async () => {
  //   const hoje = new Date();
  //   const inputAgendamento: CriarAgendamentoDTO = {
  //     motoristaNome: "João",
  //     motoristaCpf: "12345678900",
  //     placaCaminhao: "ABC-1234",
  //     numeroContrato: "CT123",
  //     dataHora: hoje.toISOString(),
  //   };

  //   agendamentoRepository.getAtrasadosOuPendentesPorMotorista.mockResolvedValueOnce(
  //     [
  //       new Agendamento(
  //         hoje.toISOString(),
  //         "CT123",
  //         "João",
  //         "12345678900",
  //         "ABC-1234",
  //         AgendamentoStatus.pendente,
  //         "1"
  //       ),
  //     ]
  //   );

  //   expect(sut.execute(inputAgendamento)).rejects.toThrow(
  //     "Foi encontrado agendamentos pendentes/atrasados"
  //   );
  // });

  // it("Não deve permitir agendamento de dois motoristas no mesmo horário", () => {
  //   const hoje = new Date();
  //   const inputAgendamento: CriarAgendamentoDTO = {
  //     motoristaNome: "Pedro",
  //     motoristaCpf: "43221545232",
  //     placaCaminhao: "any_placa",
  //     numeroContrato: "any_contract_number",
  //     dataHora: hoje.toISOString(),
  //   };

  //   agendamentoRepository.getDataHora.mockResolvedValueOnce([
  //     new Agendamento(
  //       hoje.toISOString(),
  //       "CT123",
  //       "João",
  //       "12345678900",
  //       "ABC-1234",
  //       AgendamentoStatus.pendente,
  //       "1"
  //     ),
  //   ]);

  //   expect(sut.execute(inputAgendamento)).rejects.toThrow(
  //     "Conflito de agendamento"
  //   );
  // });
});
