import { makeAgendamentoRepositoryFactory } from "./makeAgendamentoRepositoryFactory";
import { ListarAgendamentoService } from "../../services/agendamento/listarAgendamentoService";
import { ListarAgendamentoController } from "../../controllers/listarAgendamentoController";

export const makeListarAgendamentoControllerFactory = () => {
  const agendamentoRepository = makeAgendamentoRepositoryFactory();
  const listarAgendamentoService = new ListarAgendamentoService(
    agendamentoRepository
  );
  return new ListarAgendamentoController(listarAgendamentoService);
};
