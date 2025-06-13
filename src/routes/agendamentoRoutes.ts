import express from "express";
import { makeCriarAgendamentoControllerFactory } from "../shared/factories/makeCriarAgendamentoController";
import { makeListarAgendamentoControllerFactory } from "../shared/factories/makeListarAgendamentoController";
import { makeAtualizarStatusAgendamentoControllerFactory } from "../shared/factories/makeAtualizarStatusAgendamentoController";
import { makeRemoverAgendamentoControllerFactory } from "../shared/factories/makeRemoverAgendamentoController";

const router = express.Router();

const criarAgendamentoController = makeCriarAgendamentoControllerFactory();
const listarAgendamentoController = makeListarAgendamentoControllerFactory();
const atualizarStatusAgendamentoController =
  makeAtualizarStatusAgendamentoControllerFactory();
const removerAgendamentoController = makeRemoverAgendamentoControllerFactory();

router.patch("/agendamentos/:id/status", (req, res) =>
  atualizarStatusAgendamentoController.execute(req, res)
);
router.get("/agendamentos", (req, res) =>
  listarAgendamentoController.execute(req, res)
);
router.post("/agendamentos", (req, res) =>
  criarAgendamentoController.execute(req, res)
);
router.delete("/agendamentos/antigos", (req, res) =>
  removerAgendamentoController.execute(req, res)
);
export default router;
