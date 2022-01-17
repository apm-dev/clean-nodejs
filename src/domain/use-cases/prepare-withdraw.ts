import { ILogger } from "../ports/base";
import { IPrepareWithdraw, IProvider, IWithdrawRepository } from "../ports/withdraw";
import Withdraw from "../withdraw";

export default class PrepareWithdraw implements IPrepareWithdraw {
  private _repo: IWithdrawRepository;
  private _provider: IProvider;
  private _logger: ILogger;

  constructor(repo: IWithdrawRepository, provider: IProvider, logger: ILogger) {
    this._repo = repo;
    this._provider = provider;
    this._logger = logger;
  }

  public async execute(withdraw: Withdraw): Promise<void> {
    if (!withdraw) {
      throw new Error('should pass withdraw as input');
    }
    this._logger.debug('preparing withdraw', withdraw.uniqueId);

    const tx = await this._provider.createTx({
      to: withdraw.destination, amount: withdraw.amount,
    });

    withdraw.markPrepared(tx.source, tx.rawTx, tx.txId);

    await this._repo.update(withdraw);
  }
}