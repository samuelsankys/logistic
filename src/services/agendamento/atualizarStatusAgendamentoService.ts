import { isSameDay } from "date-fns";
import { Agendamento, AgendamentoStatus } from "../../models/agendamento";
import { IAgendamentoRepository } from "../../repositories/agendamentoRepository.interface";

export interface AtualizarStatusAgendamentoDTO {
  id: string;
  status: AgendamentoStatus;
}

export class AtualizarStatusAgendamentoService {
  constructor(private readonly agendamentoRepository: IAgendamentoRepository) {}
  async execute(input: AtualizarStatusAgendamentoDTO) {
    if (
      input.status !== AgendamentoStatus.concluido &&
      input.status !== AgendamentoStatus.cancelado
    ) {
      throw new Error("Não é possível alterar o agendamento com esse status");
    }

    const agendamento = await this.agendamentoRepository.buscarPorId(input.id);
    if (!agendamento) {
      throw new Error("Agendamento nao encontrado");
    }
  }
}
