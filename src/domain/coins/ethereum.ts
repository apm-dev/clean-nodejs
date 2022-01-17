import { CronExpressionType, INetworkConstant } from "./base";

export class EthereumConfigs implements INetworkConstant {
  decimal: number = 18;
  validityTimeInMs: number = 10000;
  cronExpression: CronExpressionType = {
    cancelUnresolved: '*/30 * * * *',
    doCommitted: '*/2 * * * *',
    doPrepared: '*/30 * * * * *',
    doUnresolved: '*/15 * * * *',
  };
}
