
const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then(response => response.json());
}
export function fetchInfo(coinId:string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}
export function fetchTicker(coinId:string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
}
export function fetchCoinHistory(coinId:string) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then(response => response.json());
}

// export async function fetchCoinHistory(coinId:string) {
//   const response = await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`);
//   const json = await response.json();
//   return json;
// }