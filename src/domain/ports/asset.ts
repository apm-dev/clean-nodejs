import { Coins, Networks } from "../coins/registry";

// database
export interface IAssetRepository {
  findIdByNetworkAndCoin(network: Networks, coin: Coins): Promise<number>;
  // other methods...
}
