import { isBefore, subDays } from "date-fns";
import { IAgendamentoRepository } from "../../repositories/agendamentoRepository.interface";

export class RemoverAgendamentoService {
  constructor(private readonly agendamentoRepository: IAgendamentoRepository) {}
  async execute() {
    const agendamentos = await this.agendamentoRepository.busqueComFiltro();
    const limite = subDays(new Date(), 3);

    for (const agendamento of agendamentos) {
      const data = agendamento.dataHora;

      if (isBefore(data, limite)) {
        await this.agendamentoRepository.removerPorId(agendamento.id!);
      }
    }

    return true;
  }
}
