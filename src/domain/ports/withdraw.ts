import { SubmitWithdrawInput, Transaction } from '../dto';
import Withdraw, { WithdrawStatus } from '../withdraw';
import UseCase, { ITransactionalRepo } from './base';

// use-cases
export interface ISubmitWithdraw extends UseCase<SubmitWithdrawInput, void> { }
export interface IPrepareWithdraw extends UseCase<Withdraw, void> { }
export interface IBroadcastWithdraw extends UseCase<Withdraw, void> { }
export interface IVerifyWithdraw extends UseCase<Withdraw, void> { }
export interface IProcessUnresolved extends UseCase<Withdraw, void> { }
export interface IProcessPrepared extends UseCase<Withdraw, void> { }
export interface IProcessCommitted extends UseCase<Withdraw, void> { }

// blockchain
export interface IProvider {
  createTx(data: { to: string, amount: string }): Promise<{ source: string, rawTx: string, txId: string }>;
  broadcastTx(tx: string): Promise<string>;
  getTxByHash(txId: string): Promise<Transaction>;
  balance(address: string): Promise<string>;
}

// database
export interface IWithdrawRepository extends ITransactionalRepo<IWithdrawRepository> {
  findById(id: number): Promise<Withdraw>;
  findByStatus(status: WithdrawStatus): Promise<Withdraw[]>;
  insert(withdraw: Withdraw): Promise<number>;
  update(withdraw: Withdraw): Promise<void>;
  // other methods...
}
