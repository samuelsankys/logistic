import { AgendamentoDTO } from "../mapper/agendamentoMapper";
import { Agendamento, AgendamentoStatus } from "../models/agendamento";
import { DBClient } from "../shared/database/db";
import { agendamentos } from "../shared/database/schema";
import { IAgendamentoRepository } from "./agendamentoRepository.interface";

import { and, eq, or } from "drizzle-orm";

export class DrizzleAgendamentoRepository implements IAgendamentoRepository {
  constructor(private readonly db: DBClient) {}
  async buscarPorId(id: string): Promise<Agendamento | null> {
    const result = await this.db
      .select()
      .from(agendamentos)
      .where(eq(agendamentos.id, +id))
      .get();

    return result ? this.mapToDomain(result as any) : null;
  }
  async criar(agendamento: Agendamento): Promise<Agendamento | null> {
    const resposta = await this.db
      .insert(agendamentos)
      .values({
        dataHora: agendamento.dataHora,
        numeroContrato: agendamento.numeroContrato,
        motoristaNome: agendamento.motoristaNome,
        motoristaCpf: agendamento.motoristaCpf,
        placaCaminhao: agendamento.placaCaminhao,
        status: agendamento.status as AgendamentoStatus,
      })
      .run();

    if (!resposta) return null;

    const newAgendamento = new Agendamento(
      agendamento.dataHora,
      agendamento.numeroContrato,
      agendamento.motoristaNome,
      agendamento.motoristaCpf,
      agendamento.placaCaminhao,
      agendamento.status,
      String(resposta?.lastInsertRowid.toString())
    );
    return this.mapToDomain(newAgendamento);
  }
  async getDataHora(dataHora: string): Promise<Agendamento[]> {
    const resultado = await this.db
      .select()
      .from(agendamentos)
      .where(eq(agendamentos.dataHora, dataHora));

    return resultado ? resultado.map(this.mapToDomain as any) : [];
  }

  async getAtrasadosOuPendentesPorMotorista(
    motoristaCpf: string
  ): Promise<Agendamento[]> {
    const resultado = await this.db
      .select()
      .from(agendamentos)
      .where(
        and(
          eq(agendamentos.motoristaCpf, motoristaCpf),
          or(
            eq(agendamentos.status, "pendente"),
            eq(agendamentos.status, "atrasado")
          )
        )
      );
    return resultado ? resultado.map(this.mapToDomain as any) : [];
  }

  async update(agendamento: Agendamento): Promise<void> {
    await this.db
      .update(agendamentos)
      .set({
        dataHora: agendamento.dataHora,
        numeroContrato: agendamento.numeroContrato,
        motoristaNome: agendamento.motoristaNome,
        motoristaCpf: agendamento.motoristaCpf,
        placaCaminhao: agendamento.placaCaminhao,
        status: agendamento.status,
      })
      .where(eq(agendamentos.id, +agendamento.id!))
      .run();
  }
  async busqueComFiltro(): Promise<Agendamento[]> {
    const results = await this.db.select().from(agendamentos).all();
    return results.map(this.mapToDomain as any);
  }
  async removerPorId(id: string): Promise<void> {
    await this.db.delete(agendamentos).where(eq(agendamentos.id, +id)).run();
  }

  private mapToDomain(data: AgendamentoDTO): Agendamento {
    return new Agendamento(
      data.dataHora,
      data.numeroContrato,
      data.motoristaNome,
      data.motoristaCpf,
      data.placaCaminhao,
      data.status as AgendamentoStatus,
      data.id
    );
  }
}
