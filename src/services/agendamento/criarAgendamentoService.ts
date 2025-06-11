import { isSameDay } from "date-fns";
import { Agendamento, AgendamentoStatus } from "../../models/agendamento";
import { IAgendamentoRepository } from "../../repositories/agendamentoRepository.interface";

export interface CriarAgendamentoDTO {
  motoristaNome: string;
  motoristaCpf: string;
  placaCaminhao: string;
  numeroContrato: string;
  dataHora: string;
}

export class CriarAgendamentoService {
  constructor(private readonly agendamentoRepository: IAgendamentoRepository) {}
  async execute(input: CriarAgendamentoDTO) {
    const existeAgendamentosPendentes =
      await this.agendamentoRepository.getAtrasadosOuPendentesPorMotorista(
        input.motoristaCpf
      );
    if (existeAgendamentosPendentes?.length > 0)
      throw Error("Foi encontrado agendamentos pendentes/atrasados");

    const existeAgendamentoMesMaHora =
      await this.agendamentoRepository.getDataHora(input.dataHora);
    if (existeAgendamentoMesMaHora) {
      throw new Error("Já existe agendamento para essa data e hora");
    }

    const novoAgendamento = await this.agendamentoRepository.criar(
      new Agendamento(
        input.dataHora,
        input.numeroContrato,
        input.motoristaNome,
        input.motoristaCpf,
        input.placaCaminhao,
        AgendamentoStatus.pendente
      )
    );

    return novoAgendamento;
  }
}
