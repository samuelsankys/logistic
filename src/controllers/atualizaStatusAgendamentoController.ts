import { Request, Response } from "express";
import { AtualizarStatusAgendamentoService } from "../services/agendamento/atualizarStatusAgendamentoService";

export class AtualizarStatusAgendamentoController {
  constructor(
    private readonly atualizarStatusAgendamentoService: AtualizarStatusAgendamentoService
  ) {}

  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await this.atualizarStatusAgendamentoService.execute({
        id,
        status,
      });
      return res.status(204).end();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
