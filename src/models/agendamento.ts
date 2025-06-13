export enum AgendamentoStatus {
  pendente = "pendente",
  concluido = "concluido",
  atrasado = "atrasado",
  cancelado = "cancelado",
}

export class Agendamento {
  private _id?: string;
  private _dataHora: string;
  private _numeroContrato: string;
  private _motoristaNome: string;
  private _motoristaCpf: string;
  private _placaCaminhao: string;
  private _status: AgendamentoStatus;

  constructor(
    dataHora: string,
    numeroContrato: string,
    motoristaNome: string,
    motoristaCpf: string,
    placaCaminhao: string,
    status: AgendamentoStatus,
    id?: string
  ) {
    this._dataHora = dataHora;
    this._numeroContrato = numeroContrato;
    this._motoristaNome = motoristaNome;
    this._motoristaCpf = motoristaCpf;
    this._placaCaminhao = placaCaminhao;
    this._status = status;
    this._id = id;
  }

  get id(): string | undefined {
    return this._id;
  }

  get motoristaCpf(): string {
    return this._motoristaCpf;
  }

  get motoristaNome(): string {
    return this._motoristaNome;
  }

  get numeroContrato(): string {
    return this._numeroContrato;
  }

  get dataHora(): string {
    return this._dataHora;
  }

  get placaCaminhao(): string {
    return this._placaCaminhao;
  }

  get status(): AgendamentoStatus {
    return this._status;
  }

  setStatus(newStatus: AgendamentoStatus) {
    if (this.status === AgendamentoStatus.cancelado) {
      throw new Error("Não é possível alterar o agendamento cancelado");
    }
    if (
      this.status === AgendamentoStatus.concluido &&
      newStatus === AgendamentoStatus.cancelado
    ) {
      throw new Error("Não é possível alterar o agendamento concluido");
    }
    if (
      newStatus !== AgendamentoStatus.concluido &&
      newStatus !== AgendamentoStatus.cancelado
    ) {
      throw new Error("Não é possível alterar o agendamento com esse status");
    }
    if (
      newStatus === AgendamentoStatus.concluido ||
      newStatus === AgendamentoStatus.cancelado
    ) {
      this._status = newStatus;
    }
  }
}
