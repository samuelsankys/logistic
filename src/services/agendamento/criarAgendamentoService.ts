import {
  AgendamentoDTO,
  AgendamentoMapper,
} from "../../mapper/agendamentoMapper";
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

  async execute(input: CriarAgendamentoDTO): Promise<AgendamentoDTO | null> {
    const agendamento = new Date(input.dataHora);
    const agora = new Date();
    const umMinutosAntes = new Date(agora.getTime() - 5 * 60 * 1000);

    console.log(agendamento.getTime(), umMinutosAntes.getTime());
    if (agendamento.getTime() < umMinutosAntes.getTime()) {
      throw new Error("Permitido somente para horários futuros");
    }

    const [existeAgendamentosPendentes, existeAgendamentoMesMaHora] =
      await Promise.all([
        this.agendamentoRepository.getAtrasadosOuPendentesPorMotorista(
          input.motoristaCpf
        ),
        this.agendamentoRepository.getDataHora(input.dataHora),
      ]);

    if (existeAgendamentosPendentes?.length > 0) {
      throw new Error("Foi encontrado agendamentos pendentes/atrasados");
    }
    if (existeAgendamentoMesMaHora?.length > 0) {
      throw new Error("Conflito de agendamento");
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

    return novoAgendamento ? AgendamentoMapper.toDTO(novoAgendamento) : null;
  }
}
