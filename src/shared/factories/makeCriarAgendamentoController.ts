import { makeAgendamentoRepositoryFactory } from "./makeAgendamentoRepositoryFactory";
import { CriarAgendamentoService } from "../../services/agendamento/criarAgendamentoService";
import { CriarAgendamentoController } from "../../controllers/criarAgendamentoController";

export const makeCriarAgendamentoControllerFactory = () => {
  const agendamentoRepository = makeAgendamentoRepositoryFactory();
  const criarAgendamentoService = new CriarAgendamentoService(
    agendamentoRepository
  );
  return new CriarAgendamentoController(criarAgendamentoService);
};
