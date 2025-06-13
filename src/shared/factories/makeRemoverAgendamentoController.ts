import { makeAgendamentoRepositoryFactory } from "./makeAgendamentoRepositoryFactory";
import { RemoverAgendamentoService } from "../../services/agendamento/removerAgendamentoService";
import { RemoverAgendamentoController } from "../../controllers/removerAgendamentoController";

export const makeRemoverAgendamentoControllerFactory = () => {
  const agendamentoRepository = makeAgendamentoRepositoryFactory();
  const service = new RemoverAgendamentoService(agendamentoRepository);
  return new RemoverAgendamentoController(service);
};
