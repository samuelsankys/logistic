import { db } from "./db";

db.run(`
  CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_hora TEXT NOT NULL,
    numero_contrato TEXT NOT NULL,
    motorista_nome TEXT NOT NULL,
    motorista_cpf TEXT NOT NULL,
    placa_caminhao TEXT NOT NULL,
    status TEXT NOT NULL
  )
`);
