import { INetworkConstant } from "./base";
import { EthereumConfigs } from "./ethereum";
import { Networks } from "./registry";

export 
const instances = new Map<Networks, INetworkConstant>([
  [Networks.Ethereum, new EthereumConfigs]
]);

export function getConstantsOf(network: Networks): INetworkConstant {
  let instance = instances.get(network);
  if (instance) return Object.freeze(instance);
  throw new Error(`there is no constants for ${network}`);
}
