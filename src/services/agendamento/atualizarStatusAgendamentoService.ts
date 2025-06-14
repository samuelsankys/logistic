import { AgendamentoMapper } from "../../mapper/agendamentoMapper";
import { AgendamentoStatus } from "../../models/agendamento";
import { IAgendamentoRepository } from "../../repositories/agendamentoRepository.interface";

export interface AtualizarStatusAgendamentoDTO {
  id: string;
  status: AgendamentoStatus;
}

export class AtualizarStatusAgendamentoService {
  constructor(private readonly agendamentoRepository: IAgendamentoRepository) {}
  async execute(input: AtualizarStatusAgendamentoDTO) {
    const agendamento = await this.agendamentoRepository.buscarPorId(input.id);
    if (!agendamento) {
      throw new Error("Agendamento nao encontrado");
    }
    agendamento.setStatus(input.status);

    await this.agendamentoRepository.update(agendamento);
    return AgendamentoMapper.toDTO(agendamento);
  }
}
