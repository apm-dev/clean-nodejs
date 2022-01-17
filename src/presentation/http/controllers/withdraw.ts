import { Request, Response } from 'express';
import { SubmitWithdrawInput } from '../../../domain/dto';
import { Coins, Networks } from '../../../domain/coins/registry';
import { WithdrawService } from '../../../domain/use-cases';

export default class WithdrawController {
  private _getWithdrawService: (network: Networks, coin: Coins) => WithdrawService;

  constructor(getWithdrawService: (network: Networks, coin: Coins) => WithdrawService) {
    this._getWithdrawService = getWithdrawService;
  }

  /**
   * submitWithdraw
   */
  public async submitWithdraw(req: Request, res: Response): Promise<void> {
    const service = this._getWithdrawService(req.body.network, req.body.coin)
    await service.submit.execute({
      uniqueId: req.body.unique_id,
      amount: req.body.amount,
      destination: req.body.destination,
    } as SubmitWithdrawInput);

    res.send('withdraw submitted');
  }
}
