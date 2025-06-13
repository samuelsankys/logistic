import { Request, Response } from "express";
import { ListarAgendamentoService } from "../services/agendamento/listarAgendamentoService";
import {
  FiltroListarAgendamento,
  PaginacaoListarAgendamento,
} from "../repositories/agendamentoRepository.interface";

export interface ListarAgendamentoDTO {
  filtro?: FiltroListarAgendamento;
  paginacao?: PaginacaoListarAgendamento;
}

export class ListarAgendamentoController {
  constructor(
    private readonly listarAgendamentoService: ListarAgendamentoService
  ) {}

  async execute(req: Request, res: Response) {
    const { data, status, motoristaCpf, limit, page } = req.query as {
      data?: string;
      status?: string;
      motoristaCpf?: string;
      limit?: string;
      page?: string;
    };

    let blockLimit = null;
    if (limit && +limit > 100) blockLimit = "100";
    const filtro: FiltroListarAgendamento = {
      data,
      status,
      motoristaCpf,
    };
    const paginacao: PaginacaoListarAgendamento = {
      limit: limit ? Number(blockLimit || limit) : undefined,
      page: page ? Number(page) : undefined,
    };

    const input: ListarAgendamentoDTO = { filtro, paginacao };

    try {
      const agendamento = await this.listarAgendamentoService.execute(input);

      res.status(200).json(agendamento);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
