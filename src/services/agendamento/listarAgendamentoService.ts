import { IAgendamentoRepository } from "../../repositories/agendamentoRepository.interface";

export interface ListarAgendamentoDTO {
  motoristaNome: string;
  motoristaCpf: string;
  placaCaminhao: string;
  numeroContrato: string;
  dataHora: string;
}

export class ListarAgendamentoService {
  constructor(private readonly agendamentoRepository: IAgendamentoRepository) {}

  async execute(input: ListarAgendamentoDTO) {
    return await this.agendamentoRepository.busqueComFiltro();
  }
}
