import express from "express";
import { makeCriarAgendamentoControllerFactory } from "../shared/factories/makeCriarAgendamentoController";
import { makeListarAgendamentoControllerFactory } from "../shared/factories/makeListarAgendamentoController";

const router = express.Router();

const criarAgendamentoController = makeCriarAgendamentoControllerFactory();
const listarAgendamentoController = makeListarAgendamentoControllerFactory();

router.get("/agendamentos", (req, res) =>
  listarAgendamentoController.execute(req, res)
);
router.post("/agendamentos", (req, res) =>
  criarAgendamentoController.execute(req, res)
);
// router.patch("/agendamentos/:id/status", atualizarStatusAgendamento);
// router.delete("/agendamentos/antigos", deletarAgendamentosAntigos);

export default router;
