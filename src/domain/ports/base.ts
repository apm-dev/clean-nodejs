import { DomainEvent } from "../events/base";

export default interface UseCase<Inputs = any, Result = void> {
  execute(inputs?: Inputs): Promise<Result>;
}

export interface ITransactionalRepo<T> {
  beginTx(tx?: any): Promise<T>;
  commitTx(): Promise<void>;
  rollbackTx(): Promise<void>;
}

export interface IDomainEventPublisher {
  publish(aggregateType: string, aggregateId: string, events: DomainEvent[]): Promise<void>;
}

export interface ILogger {
  debug(msg: string, ...meta: any[]): void;
  info(msg: string, ...meta: any[]): void;
  warn(msg: string, ...meta: any[]): void;
  error(msg: string, ...meta: any[]): void;
}
