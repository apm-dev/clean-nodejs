import { Coins, Networks } from "../coins/registry";

export type SubmitWithdrawInput = {
  network: Networks,
  coin: Coins,
  uniqueId: string;
  amount: string;
  destination: string;
}