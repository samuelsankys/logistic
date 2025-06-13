import { Agendamento, AgendamentoStatus } from "../models/agendamento";

export interface FiltroListarAgendamento {
  motoristaCpf?: string;
  data?: string;
  status?: string;
}
export interface PaginacaoListarAgendamento {
  page?: number;
  limit?: number;
}

export interface IAgendamentoRepository {
  criar(agendamento: Agendamento): Promise<Agendamento | null>;
  getDataHora(dataHora: string): Promise<Agendamento[]>;
  getAtrasadosOuPendentesPorMotorista(
    motoristaCpf: string
  ): Promise<Agendamento[]>;
  buscarPorId(id: string): Promise<Agendamento | null>;
  update(agendamento: Agendamento): Promise<void>;
  busqueComFiltro(
    filtro?: FiltroListarAgendamento,
    paginacao?: PaginacaoListarAgendamento
  ): Promise<Agendamento[]>;
  removerPorId(id: string): Promise<void>;
}
