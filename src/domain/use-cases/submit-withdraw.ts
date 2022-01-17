import { SubmitWithdrawInput } from "../dto";
import { IAssetRepository } from "../ports/asset";
import { IProcessUnresolved, ISubmitWithdraw, IWithdrawRepository } from "../ports/withdraw";
import Withdraw from "../withdraw";

export default class SubmitWithdraw implements ISubmitWithdraw {
  private _withdrawRepo: IWithdrawRepository;
  private _assetRepo: IAssetRepository;
  private _processUnresolved: IProcessUnresolved;

  constructor(withdrawRepo: IWithdrawRepository, assetRepo: IAssetRepository, processUnresolved: IProcessUnresolved) {
    this._withdrawRepo = withdrawRepo;
    this._assetRepo = assetRepo;
    this._processUnresolved = processUnresolved;
  }

  public async execute(inputs: SubmitWithdrawInput): Promise<void> {
    const assetId = await this._assetRepo.findIdByNetworkAndCoin(inputs.network, inputs.coin);
    const withdraw = new Withdraw(
      inputs.uniqueId, assetId,
      inputs.amount, inputs.destination,
    );
    await this._withdrawRepo.insert(withdraw);
    await this._processUnresolved.execute(withdraw);
  }
}