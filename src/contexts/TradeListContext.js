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
    constructor(props){
        super(props);
        this.state = {
            tradeList: [],
            myTrades: [],
            userId: null,
            error: null
        };
    }

    setTradeList = tradeList => {
        this.setState({ tradeList })
    }

    setMyTrades = () => {
        let trades = this.state.tradeList;
        let id = this.state.userId;
        const userTrades = [];
        trades.forEach(trade => {
            if(trade.user_id === id){
                userTrades.push(trade);
            }
        })
        this.setState({myTrades: userTrades})
    }



    setUserId = (userId) => {
        this.setState({ userId: userId })
    }

    addTrade = trade => {
        this.setState({
            tradeList: [...this.state.tradeList, trade],
        })
    }

    deleteTrade = (tradeId) => {
        const newTradeList = this.state.tradeList.filter(trade => trade.id !== tradeId);
        this.setState({ tradeList: newTradeList })
    }

    updateTrade = (tradeId, key, value) => {
        const newTradeList = this.state.tradeList.map(trade => {
            if (trade.id === tradeId) {
                trade[key] = value
            }
            return trade
        })
        // console.log(tradeId)
        // console.log('New trade list', newTradeList)
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
                    throw new Error(res.status)
                }
                return res.json()
            })
        .catch(error => {
            console.error(error);
            this.setState({ error })
        })
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
            userId: this.state.userId,
            error: this.state.error,
            addTrade: this.addTrade,
            deleteTrade: this.deleteTrade,
            updateTrade: this.updateTrade,
            setError: this.setError,
            clearError: this.clearError,
            setTradeList: this.setTradeList,
            fetchTrades: this.fetchTrades,
            myTrades: this.state.myTrades,
            setUserId: this.setUserId,
            setMyTrades: this.setMyTrades,
        }
        return (
            <TradeListContext.Provider value={contextValue}>
                {this.props.children}
            </TradeListContext.Provider>
        )
    }
}