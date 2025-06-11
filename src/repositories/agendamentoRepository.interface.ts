import { Agendamento } from "../models/agendamento";

export interface IAgendamentoRepository {
  criar(agendamento: Agendamento): Promise<Agendamento>;
  getDataHora(id: string): Promise<Agendamento | null>;
  getAtrasadosOuPendentesPorMotorista(
    motoristaCpf: string
  ): Promise<Agendamento[]>;
}
