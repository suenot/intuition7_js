import { parseOrderBooks } from "./parseOrderBooks.js";

const main = async () => {
  const exchangeIds = ['binance', 'okex', 'kucoin'];
  const pairIds = ['ETH/BTC', 'LTC/BTC', 'BTC/USDT', 'ETH/USDT', 'DOGE/USDT'];
  parseOrderBooks({exchangeIds, pairIds});

};

main();