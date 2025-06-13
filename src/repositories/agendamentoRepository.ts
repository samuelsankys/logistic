import { AgendamentoDTO } from "../mapper/agendamentoMapper";
import { Agendamento, AgendamentoStatus } from "../models/agendamento";
import { DBClient } from "../shared/database/db";
import { agendamentos } from "../shared/database/schema";
import {
  FiltroListarAgendamento,
  IAgendamentoRepository,
  PaginacaoListarAgendamento,
} from "./agendamentoRepository.interface";

import { and, eq, gte, lt, or } from "drizzle-orm";

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
    return newAgendamento;
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

  async busqueComFiltro(
    filtro?: FiltroListarAgendamento,
    paginacao?: PaginacaoListarAgendamento
  ): Promise<Agendamento[]> {
    const limit = paginacao?.limit || 10;
    const offset = paginacao?.page ? (paginacao?.page - 1) * limit : 0;
    const { data, status, motoristaCpf } = filtro || {};

    const conditions = [];
    if (data) {
      const start = new Date(`${data}T00:00:00.000Z`);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);

      conditions.push(
        and(
          gte(agendamentos.dataHora, start.toISOString()),
          lt(agendamentos.dataHora, end.toISOString())
        )
      );
    }
    if (status) conditions.push(eq(agendamentos.status, status));
    if (motoristaCpf)
      conditions.push(eq(agendamentos.motoristaCpf, motoristaCpf));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const results = await this.db
      .select()
      .from(agendamentos)
      .where(whereClause)
      .limit(limit)
      .offset(offset);

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
