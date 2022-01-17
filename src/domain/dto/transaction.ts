export enum TransactionStatus {
  Pending = 0,
  Confirmed,
  Failed,
}

export type Transaction = {
  txId: string;
  amount: string;
  fee: number;
  source: string;
  destination: string;
  status: TransactionStatus;
}
