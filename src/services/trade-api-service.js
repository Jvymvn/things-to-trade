import config from '../config';
import TokenService from '../services/token-service';

const TradeApiService = {
    getTrades() {
        return fetch(`${config.API_ENDPOINT}/trades`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
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
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postTrade(trade) {
        return fetch(`${config.API_ENDPOINT}/trades`, {
            method: 'POST',
            body: JSON.stringify(trade),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(error => Promise.reject(error))
                    : res.json()
            )
    },
    deleteTrade(tradeId){
        const body = JSON.stringify({
            // "tradeId": `${tradeId}`
            tradeId: tradeId
        })
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: body
        };
        return fetch(`${config.API_ENDPOINT}/trades`, options)
    },
}

export default TradeApiService;