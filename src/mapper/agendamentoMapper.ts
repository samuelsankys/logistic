import { Agendamento } from "../models/agendamento";

export interface AgendamentoDTO {
  id?: string;
  dataHora: string;
  numeroContrato: string;
  motoristaNome: string;
  motoristaCpf: string;
  placaCaminhao: string;
  status: string;
}

export class AgendamentoMapper {
  static toDTO(agendamento: Agendamento): AgendamentoDTO {
    return {
      dataHora: agendamento.dataHora,
      numeroContrato: agendamento.numeroContrato,
      motoristaNome: agendamento.motoristaNome,
      motoristaCpf: agendamento.motoristaCpf,
      placaCaminhao: agendamento.placaCaminhao,
      status: agendamento.status,
      id: agendamento.id,
    };
  }
}
