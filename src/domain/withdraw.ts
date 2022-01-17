import Bundle from './bundle';
import { DomainEvent } from './events/base';
import { WithdrawCommittedEvent } from './events/withdraw';

export enum WithdrawStatus {
  Failed = -1,
  Unresolved = 0,
  Prepared,
  Committed,
  Verified,
}

export default class Withdraw {
  private _id?: number;
  private _uniqueId: string;
  private _assetId: number;
  private _txId?: string;
  private _amount: string;
  private _source?: string;
  private _destination: string;
  private _memo?: string;
  private _rawData?: string;
  private _status: WithdrawStatus;
  private _bundle?: Bundle;

  constructor(uniqueId: string, assetId: number, amount: string, destination: string) {
    this._uniqueId = uniqueId;
    this._assetId = assetId;
    this._amount = amount;
    this._destination = destination;
    this._status = WithdrawStatus.Unresolved;
  }
  /**
   * markPrepared
   */
  public markPrepared(source: string, rawData: string, txId?: string): void {
    if (this._status !== WithdrawStatus.Unresolved) {
      throw new Error(`can't transform withdraw from ${this._status} to prepared state`);
    }
    this._source = source;
    this._rawData = rawData;
    this._txId = txId ?? this._txId;
    this._status = WithdrawStatus.Prepared;
  }

  /**
   * markCommitted
   */
  public markCommitted(txId: string): DomainEvent[] {
    if (this._status !== WithdrawStatus.Prepared) {
      throw new Error(`can't transform withdraw from ${this._status} to committed state`);
    }
    this._txId = txId;
    this._status = WithdrawStatus.Committed;
    return [new WithdrawCommittedEvent(`${this._id}`, this._uniqueId)];
  }

  /**
   * Getter rawData
   * @return {string}
   */
  public get rawData(): string | undefined {
    return this._rawData;
  }

  /**
   * Getter uniqueId
   * @return {string}
   */
  public get uniqueId(): string {
    return this._uniqueId;
  }


  /**
   * Getter assetId
   * @return {number}
   */
  public get assetId(): number {
    return this._assetId;
  }

  /**
   * Getter amount
   * @return {number}
   */
  public get amount(): string {
    return this._amount;
  }

  /**
   * Getter source
   * @return {string}
   */
  public get source(): string | undefined {
    return this._source;
  }

  /**
   * Getter destination
   * @return {string}
   */
  public get destination(): string {
    return this._destination;
  }

  /**
   * Getter status
   * @return {WithdrawStatus}
   */
  public get status(): WithdrawStatus {
    return this._status;
  }
}

