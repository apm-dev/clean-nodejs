import { Coins, Networks } from "../../domain/coins/registry";
import { IProvider } from "../../domain/ports/withdraw";
import config from '../../utils/config';
import * as ethereum from "./ethereum";

const providers = new Map<Networks, Map<Coins, IProvider>>([
  [
    Networks.Bitcoin, new Map([
      [Coins.BTC, {} as any],
    ])
  ],
  [
    Networks.Ethereum, new Map([
      [Coins.ETH, ethereum.Init(
        Coins.ETH, +config.get('eth.chainId'),
        config.get('eth.api'), config.get('eth.prvKey'),
      )],
      [Coins.USDT, ethereum.Init(
        Coins.USDT, +config.get('eth.usdt.chainId'),
        config.get('eth.usdt.api'), config.get('eth.usdt.prvKey'),
      )],
    ])
  ],
  [
    Networks.Tron, new Map([
      [Coins.TRX, {} as any],
      [Coins.USDT, {} as any],
    ])
  ],
]);

export function getProvider(network: Networks, coin: Coins): IProvider {
  const coins = providers.get(network);
  if (!coins) throw new Error(`network ${network} not supported.`);

  const provider = coins.get(coin);
  if (!provider) throw new Error(`coin ${coin} on ${network} not supported.`);

  return Object.freeze(provider);
}
