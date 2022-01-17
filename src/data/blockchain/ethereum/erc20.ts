import EthProvider from "./eth";
import { Token } from "./tokens";

export default class Erc20Provider extends EthProvider {
  protected token: Token;
  constructor(
    chainId: number,
    address: string,
    prvKey: string,
    pubKey: string,
    url: string,
    token: Token,
  ) {
    super(chainId, address, prvKey, pubKey, url);
    this.token = token;
  }

  public async createTx(data: { to: string; amount: string; }): Promise<{ source: string, rawTx: string; txId: string; }> {
    throw new Error('erc20 Method not implemented.');
  }

  public async balance(address: string): Promise<string> {
    throw new Error('erc20 Method not implemented.');
  }
}