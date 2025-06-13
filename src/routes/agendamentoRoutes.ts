import express from "express";
import { makeCriarAgendamentoControllerFactory } from "../shared/factories/makeCriarAgendamentoController";

const router = express.Router();

const criarAgendamentoController = makeCriarAgendamentoControllerFactory();

// router.get("/agendamentos", listarTodosAgendamentos);
router.post("/agendamentos", (req, res) =>
  criarAgendamentoController.execute(req, res)
);
// router.patch("/agendamentos/:id/status", atualizarStatusAgendamento);
// router.delete("/agendamentos/antigos", deletarAgendamentosAntigos);

export default router;
