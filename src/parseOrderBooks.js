import _ from "lodash";
import ccxt from "ccxt";
import { sleep } from "./sleep.js";
import debug from "debug";
// import { store } from "./db/store/store";
const log = debug("parseOrderBooks");

export const parseOrderBooks = async ({exchangeIds, pairIds}) => {
  log('parseOrderBooks', {exchangeIds, pairIds});
  log('For each exchange we have a separate ws connection with all pairs')
  for (const exchangeId of exchangeIds) {
    log({exchangeId});
    parseOrderBooksOneExchange({exchangeId, pairIds});
    // sleep(5000);
  }
}

export const parseOrderBooksOneExchange = async ({exchangeId, pairIds}) => {
  log('parseOrderBooksOneExchange', {exchangeId, pairIds});
  const pairIdsEmpty = _.isEmpty(pairIds);
  log({pairIdsEmpty});
  const exchangeInstance = new ccxt.pro[exchangeId]({});
  if (exchangeId in ccxt) {
    while (true) {
      if (pairIdsEmpty) {
        console.log('sleep 5s');
        await sleep(5000);
      } else {
        try {
          const orderBookCcxt = await exchangeInstance.watchOrderBookForSymbols(pairIds);
          // const orderBook = orderBookCcxtToCore({orderBookCcxt, exchangeId});
          log({orderBookCcxt});
          // upsertOrderBook(orderBook);
        } catch (e) { log(e) };
      }
    }
  }
}