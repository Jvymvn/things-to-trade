import config from '../config';
import TokenService from '../services/token-service';

const TradeApiService = {
    getTrades() {
        return fetch(`${config.API_ENDPOINT}/trades`, {
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

    //UpdateTrade, PostTrade
}

export default TradeApiService