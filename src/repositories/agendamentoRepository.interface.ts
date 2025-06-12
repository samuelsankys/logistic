import { Agendamento } from "../models/agendamento";

export interface IAgendamentoRepository {
  criar(agendamento: Agendamento): Promise<Agendamento>;
  getDataHora(dataHora: string): Promise<Agendamento[]>;
  getAtrasadosOuPendentesPorMotorista(
    motoristaCpf: string
  ): Promise<Agendamento[]>;
  buscarPorId(id: string): Promise<Agendamento | null>;
  update(agendamento: Agendamento): Promise<void>;
  busqueComFiltro(): Promise<Agendamento[]>;
  removerPorId(id: string): Promise<void>;
}
