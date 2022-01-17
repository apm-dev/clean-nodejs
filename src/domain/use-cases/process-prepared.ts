import { IBroadcastWithdraw, IProcessPrepared, IVerifyWithdraw, IWithdrawRepository } from "../ports/withdraw";
import Withdraw, { WithdrawStatus } from "../withdraw";

export default class ProcessPrepared implements IProcessPrepared {
  private _repo: IWithdrawRepository;
  private _broadcast: IBroadcastWithdraw;
  private _verify: IVerifyWithdraw;

  constructor(repo: IWithdrawRepository, broadcast: IBroadcastWithdraw, verify: IVerifyWithdraw) {
    this._repo = repo;
    this._broadcast = broadcast;
    this._verify = verify;
  }

  async execute(withdraw?: Withdraw): Promise<void> {
    let withdraws: Withdraw[];
    if (withdraw) {
      withdraws = [withdraw];
    } else {
      withdraws = await this._repo.findByStatus(WithdrawStatus.Prepared);
    }
    for (const withdraw of withdraws) {
      await this._broadcast.execute(withdraw);
      await this._verify.execute(withdraw);
    }
  }
}
