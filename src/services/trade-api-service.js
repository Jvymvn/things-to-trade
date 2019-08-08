import config from '../config'

const TradeApiService = {
    getTrades() {
        return fetch(`${config.API_ENDPOINT}/trades`, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getTrade(tradeId) {
        return fetch(`${config.API_ENDPOINT}/trades/${tradeId}`, {
            headers: {

            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
}

export default TradeApiService