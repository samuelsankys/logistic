import { makeAgendamentoRepositoryFactory } from "./makeAgendamentoRepositoryFactory";
import { AtualizarStatusAgendamentoService } from "../../services/agendamento/atualizarStatusAgendamentoService";
import { AtualizarStatusAgendamentoController } from "../../controllers/atualizaStatusAgendamentoController";

export const makeAtualizarStatusAgendamentoControllerFactory = () => {
  const agendamentoRepository = makeAgendamentoRepositoryFactory();
  const service = new AtualizarStatusAgendamentoService(agendamentoRepository);
  return new AtualizarStatusAgendamentoController(service);
};
