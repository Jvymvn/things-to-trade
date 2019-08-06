import React, { Component } from 'react'

const TradeListContext = React.createContext({
    tradeList: [],
    error: null,
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
            setTradeList: this.setState,
        }
        return (
            <TradeListContext.Provider value={value}>
                {this.props.children}
            </TradeListContext.Provider>
        )
    }
}