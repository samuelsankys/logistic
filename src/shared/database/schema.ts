import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const agendamentos = sqliteTable("agendamentos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dataHora: text("data_hora").notNull(),
  numeroContrato: text("numero_contrato").notNull(),
  motoristaNome: text("motorista_nome").notNull(),
  motoristaCpf: text("motorista_cpf").notNull(),
  placaCaminhao: text("placa_caminhao").notNull(),
  status: text("status").notNull(),
});
