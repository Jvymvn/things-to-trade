import React, { Component } from 'react'
import config from '../config'
import TokenService from '../services/token-service'

const TradeListContext = React.createContext({
    tradeList: [],
    error: null,
    addTrade: () => { },
    deleteTrade: () => { },
    updateTrade: () => { },
    setError: () => { },
    clearError: () => { },
    setTradeList: () => { },
})
export default TradeListContext

export class TradeListProvider extends Component {
    state = {
        tradeList: [],
        error: null,
    };

    setTradeList = tradeList => {
        this.setState({ tradeList })
    }

    addTrade = trade => {
        this.setState({
            tradeList: [...this.state.tradeList, trade],
        })
    }

    deleteTrade = tradeId => {
        const newTradeList = this.state.tradeList.map(trade => {
            if (trade.id !== tradeId) {
                return trade
            } else {
                return tradeId
            }
        })
        this.setState({
            tradeList: newTradeList
        })
    }

    updateTrade = (tradeId, key, value) => {
        const newTradeList = this.state.tradeList.map(trade => {
            if (trade.id === tradeId) {
                trade[key] = value
            }
            return trade
        })
        console.log(tradeId)
        console.log('New trade list', newTradeList)
        this.setState({
            tradeList: newTradeList
        })
    }

    fetchTrades() {
        fetch(`${config.API_ENDPOINT}/trades`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    alert('Must Log In')
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(this.setTradeList)
        // .catch(error => this.setState({ error }))
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const contextValue = {
            tradeList: this.state.tradeList,
            error: this.state.error,
            addTrade: this.addTrade,
            deleteTrade: this.deleteTrade,
            updateTrade: this.updateTrade,
            setError: this.setError,
            clearError: this.clearError,
            setTradeList: this.setTradeList,
            fetchTrades: this.fetchTrades,
        }
        return (
            <TradeListContext.Provider value={contextValue}>
                {this.props.children}
            </TradeListContext.Provider>
        )
    }
}