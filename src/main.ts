import Express from 'express';
import { getProvider } from "./data/blockchain";
import { Coins, Networks } from "./domain/coins/registry";
import * as ports from "./domain/ports";
import { getServiceFactory, WithdrawService } from "./domain/use-cases";
import { HttpServer } from "./presentation/http";
import WithdrawController from "./presentation/http/controllers/withdraw";

// Data and Tools
const wRepo: ports.withdraw.IWithdrawRepository = {} as any;
const aRepo: ports.asset.IAssetRepository = {} as any;
const eventPublisher: ports.base.IDomainEventPublisher = {} as any;
const logger: ports.base.ILogger = {} as any;

// Domain
const getWithdrawService = getServiceFactory(wRepo, aRepo, eventPublisher, logger);

function getService(network: Networks, coin: Coins): WithdrawService {
  const provider = getProvider(network, coin);
  return getWithdrawService(network, coin, provider);
}

// Presentation
const http = new HttpServer(
  Express(),
  new WithdrawController(getService),
);

http.start('127.0.0.1', 3000);