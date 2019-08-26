import React, { Component } from 'react'

export const nullTrade = {
    user: {},
    tags: [],
}

const TradeContext = React.createContext({
    trade: nullTrade,
    loggedIn: false,
    comments: [],
    error: null,
    setError: () => { },
    clearError: () => { },
    setTrade: () => { },
    clearTrade: () => { },
    updateTrade: () => { },
    logInUser: () => { },
    logOutUser: () => { },
})

export default TradeContext

export class TradeProvider extends Component {
    state = {
        trade: nullTrade,
        loggedIn: false,
        error: null,
    };

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setTrade = trade => {
        this.setState({ trade })
    }

    clearTrade = () => {
        this.setTrade(nullTrade)
    }

    logInUser = () => {
        this.setState({ loggedIn: true })
    }

    logOutUser = () => {
        this.setState({ loggedIn: false })
    }



    render() {
        const value = {
            trade: this.state.trade,
            loggedIn: this.state.loggedIn,
            comments: this.state.comments,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setTrade: this.setTrade,
            clearTrade: this.clearTrade,
            logInUser: this.logInUser,
            logOutUser: this.logOutUser,
        }
        return (
            <TradeContext.Provider value={value}>
                {this.props.children}
            </TradeContext.Provider>
        )
    }

}