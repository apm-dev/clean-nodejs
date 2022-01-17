export enum Platform {
  PHINIX = 'phinix',
  WALLEX = 'wallex',
}

export enum Networks {
  Bitcoin = 'bitcoin',
  Ethereum = 'ethereum',
  Tron = 'tron',
}

export enum Coins {
  BTC = 'BTC',
  ETH = 'ETH',
  TRX = 'TRX',
  USDT = 'USDT',
}

const networkCoins = new Map<Networks, Map<Platform, Set<Coins>>>([
  [
    Networks.Bitcoin, new Map([
      [Platform.PHINIX, new Set([Coins.BTC])],
      [Platform.WALLEX, new Set([Coins.BTC])],
    ])
  ],
  [
    Networks.Ethereum, new Map([
      [Platform.PHINIX, new Set([Coins.ETH, Coins.USDT])],
      [Platform.WALLEX, new Set([Coins.ETH, Coins.USDT])],
    ])
  ],
  [
    Networks.Tron, new Map([
      [Platform.PHINIX, new Set([Coins.TRX, Coins.USDT])],
      [Platform.WALLEX, new Set([Coins.TRX, Coins.USDT])],
    ])
  ],
]);

export default Object.freeze(networkCoins);
