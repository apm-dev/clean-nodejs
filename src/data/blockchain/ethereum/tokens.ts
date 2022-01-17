import { Coins } from "../../../domain/coins/registry";

export enum TokenType {
  ERC20 = 'ERC20',
}

export type Token = {
  symbol: Coins,
  address: string,
  decimals: number,
  type: TokenType,
};

const tokens = new Map<Coins, Token>([
  [Coins.USDT, {
    symbol: Coins.USDT,
    decimals: 6,
    type: TokenType.ERC20,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  }],
]);

export default Object.freeze(tokens);