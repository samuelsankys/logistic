import { AgendamentoMapper } from "../mapper/agendamentoMapper";
import { Agendamento } from "../models/agendamento";
import {
  CriarAgendamentoDTO,
  CriarAgendamentoService,
} from "../services/agendamento/criarAgendamentoService";
import { Request, Response } from "express";

export class CriarAgendamentoController {
  constructor(
    private readonly criarAgendamentoService: CriarAgendamentoService
  ) {}

  async execute(req: Request, res: Response) {
    const input: CriarAgendamentoDTO = req.body;
    try {
      const agendamento = await this.criarAgendamentoService.execute(input);

      res.status(201).json(agendamento);
    } catch (error: any) {
      console.log(error);

      res.status(400).json({ message: error.message });
    }
  }
}
