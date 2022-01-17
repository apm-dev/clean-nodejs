import { Coins } from "../../../domain/coins/registry";
import Erc20Provider from "./erc20";
import EthProvider from "./eth";
import tokens, { TokenType } from './tokens';

export function Init(
  coin: Coins,
  chainId: number,
  api: string,
  prvKey: string,
) {
  if (coin === Coins.ETH) {
    return new EthProvider(chainId, 'address', prvKey, 'pubKey', api);
  }

  const token = tokens.get(coin);
  if (!token) {
    throw new Error(`${coin} token is not implemented on Ethereum.`);
  }

  switch (token.type) {
    case TokenType.ERC20:
      return new Erc20Provider(
        chainId, 'address',
        prvKey, 'pubKey', api, token,
      );
    default:
      throw new Error(`${token.symbol} ${token.type} token is not implemented on Ethereum.`);
  }
}