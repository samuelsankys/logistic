import { Request, Response } from "express";
import { RemoverAgendamentoService } from "../services/agendamento/removerAgendamentoService";

export class RemoverAgendamentoController {
  constructor(
    private readonly removerAgendamentoService: RemoverAgendamentoService
  ) {}

  async execute(req: Request, res: Response) {
    try {
      await this.removerAgendamentoService.execute();
      return res.status(204).end();
    } catch (error: any) {
      console.log(error);

      res.status(500).json({ message: error.message });
    }
  }
}
