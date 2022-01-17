import { Transaction } from '../../../domain/dto';
import { IProvider } from '../../../domain/ports/withdraw';

export default class EthProvider implements IProvider {
  protected _chainId: number;
  protected _address: string;
  protected _prvKey: string;
  protected _pubKey: string;
  protected _url: string;

  constructor(chainId: number, address: string, prvKey: string, pubKey: string, url: string) {
    this._chainId = chainId;
    this._address = address;
    this._prvKey = prvKey;
    this._pubKey = pubKey;
    this._url = url;
  }

  public async createTx(data: { to: string; amount: string; }): Promise<{ source: string, rawTx: string; txId: string; }> {
    throw new Error('eth Method not implemented.');
  }

  public async broadcastTx(tx: string): Promise<string> {
    throw new Error('eth Method not implemented.');
  }

  public async getTxByHash(txId: string): Promise<Transaction> {
    throw new Error('eth Method not implemented.');
  }

  public async balance(address: string): Promise<string> {
    throw new Error('eth Method not implemented.');
  }
}
