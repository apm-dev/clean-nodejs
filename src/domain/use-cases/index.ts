import { Coins, Networks } from "../coins/registry";
import * as ports from "../ports";
import BroadcastWithdraw from "./broadcast-withdraw";
import PrepareWithdraw from "./prepare-withdraw";
import ProcessPrepared from "./process-prepared";
import ProcessUnresolved from "./process-unresolved";
import SubmitWithdraw from "./submit-withdraw";

export interface WithdrawService {
  submit: ports.withdraw.ISubmitWithdraw;
  prepare: ports.withdraw.IPrepareWithdraw;
  broadcast: ports.withdraw.IBroadcastWithdraw;
  verify: ports.withdraw.IVerifyWithdraw;

  processUnresolved: ports.withdraw.IProcessUnresolved;
  processPrepared: ports.withdraw.IProcessPrepared;
  processCommitted: ports.withdraw.IProcessCommitted;
}

const instances = new Map<Networks, Map<Coins, WithdrawService>>();

export function getServiceFactory(
  wRepo: ports.withdraw.IWithdrawRepository,
  aRepo: ports.asset.IAssetRepository,
  eventPublisher: ports.base.IDomainEventPublisher,
  logger: ports.base.ILogger,
) {
  return function getWithdrawService(
    network: Networks, coin: Coins,
    provider: ports.withdraw.IProvider,
  ): WithdrawService {
    let coins = instances.get(network);
    if (!coins) {
      coins = new Map();
      instances.set(network, coins);
    }
    let instance = coins.get(coin);
    if (instance) return Object.freeze(instance);

    instance = {} as WithdrawService;
    instance.prepare = new PrepareWithdraw(wRepo, provider, logger);
    instance.broadcast = new BroadcastWithdraw(wRepo, provider, eventPublisher, logger);
    instance.processUnresolved = new ProcessUnresolved(wRepo, instance.prepare, instance.broadcast, instance.verify);
    instance.processPrepared = new ProcessPrepared(wRepo, instance.broadcast, instance.verify);
    instance.submit = new SubmitWithdraw(wRepo, aRepo, instance.processUnresolved);

    coins.set(coin, instance);
    return Object.freeze(instance);
  }
}
