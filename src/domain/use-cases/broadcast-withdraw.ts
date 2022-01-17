import { IDomainEventPublisher, ILogger } from "../ports/base";
import { IBroadcastWithdraw, IProvider, IWithdrawRepository } from "../ports/withdraw";
import Withdraw from "../withdraw";

export default class BroadcastWithdraw implements IBroadcastWithdraw {
  private _repo: IWithdrawRepository;
  private _provider: IProvider;
  private _eventPublisher: IDomainEventPublisher;
  private _logger: ILogger;

  constructor(repo: IWithdrawRepository, provider: IProvider, eventPublisher: IDomainEventPublisher, logger: ILogger) {
    this._repo = repo;
    this._provider = provider;
    this._eventPublisher = eventPublisher;
    this._logger = logger;
  }

  async execute(withdraw: Withdraw): Promise<void> {
    if (!withdraw) {
      throw new Error('should pass withdraw as input');
    }
    this._logger.debug('just a simple log :)', withdraw.uniqueId);

    if (!withdraw.rawData) {
      throw new Error('withdraw should be prepared and has rawData');
    }
    const txId = await this._provider.broadcastTx(withdraw.rawData);
    const events = withdraw.markCommitted(txId);
    this._repo.update(withdraw);
    this._eventPublisher.publish(typeof (withdraw), withdraw.uniqueId, events);
  }
}
