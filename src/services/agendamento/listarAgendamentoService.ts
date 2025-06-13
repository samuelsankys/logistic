import { ListarAgendamentoDTO } from "../../controllers/listarAgendamentoController";
import { AgendamentoMapper } from "../../mapper/agendamentoMapper";
import { IAgendamentoRepository } from "../../repositories/agendamentoRepository.interface";

export class ListarAgendamentoService {
  constructor(private readonly agendamentoRepository: IAgendamentoRepository) {}

  async execute(input: ListarAgendamentoDTO) {
    const resposta = await this.agendamentoRepository.busqueComFiltro(
      input.filtro,
      input.paginacao
    );

    return resposta?.length > 0 ? resposta.map(AgendamentoMapper.toDTO) : [];
  }
}
