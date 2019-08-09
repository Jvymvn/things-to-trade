import React, { Component } from 'react'

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
        const newTradeList = this.state.tradeList
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    render() {
        const value = {
            tradeList: this.state.tradeList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setTradeList: this.setTradeList,
        }
        return (
            <TradeListContext.Provider value={value}>
                {this.props.children}
            </TradeListContext.Provider>
        )
    }
}