export interface CronExpressionType {
  doUnresolved: string
  doCommitted: string
  doPrepared: string
  cancelUnresolved: string
}

export interface INetworkConstant {
  decimal?: number | { [key: string] : number }
  validityTimeInMs: number
  cronExpression: CronExpressionType | { [key: string]: CronExpressionType }
}