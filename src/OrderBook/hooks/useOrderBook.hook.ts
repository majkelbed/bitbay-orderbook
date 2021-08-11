export async function useOrderBook() {
    const URL = process.env.REACT_APP_BITBAY_API_BASE_URL;
    console.log(URL);
    const response = await fetch(URL + '/trading/orderbook/BTC-PLN', {
        method: 'GET'
    }).then(res => res.json());
    console.log(response);
}