import { DrizzleAgendamentoRepository } from "../../repositories/agendamentoRepository";
import { db } from "../database/db";

export const makeAgendamentoRepositoryFactory = () => {
  return new DrizzleAgendamentoRepository(db);
};
