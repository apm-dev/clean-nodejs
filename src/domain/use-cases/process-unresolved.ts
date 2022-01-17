import { IBroadcastWithdraw, IPrepareWithdraw, IProcessUnresolved, IVerifyWithdraw, IWithdrawRepository } from "../ports/withdraw";
import Withdraw, { WithdrawStatus } from "../withdraw";

export default class ProcessUnresolved implements IProcessUnresolved {
  private _repo: IWithdrawRepository;
  private _prepare: IPrepareWithdraw;
  private _broadcast: IBroadcastWithdraw;
  private _verify: IVerifyWithdraw;

  constructor(repo: IWithdrawRepository, prepare: IPrepareWithdraw, broadcast: IBroadcastWithdraw, verify: IVerifyWithdraw) {
    this._repo = repo;
    this._prepare = prepare;
    this._broadcast = broadcast;
    this._verify = verify;
  }

  async execute(withdraw?: Withdraw): Promise<void> {
    let withdraws: Withdraw[];
    if (withdraw) {
      withdraws = [withdraw];
    } else {
      withdraws = await this._repo.findByStatus(WithdrawStatus.Unresolved);
    }
    for (const withdraw of withdraws) {
      await this._prepare.execute(withdraw);
      await this._broadcast.execute(withdraw);
      await this._verify.execute(withdraw);
    }
  }
}
