import { WithdrawEvent } from "./base";

export class WithdrawCommittedEvent implements WithdrawEvent {
  private _id: string;
  private _uniqueId: string;

  constructor(id: string, uniqueId: string) {
    this._id = id;
    this._uniqueId = uniqueId;
  }
}
