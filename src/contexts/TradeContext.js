import React, { Component } from 'react'

export const nullTrade = {
    user: {},
    tags: [],
}

const TradeContext = React.createContext({
    trade: nullTrade,
    comments: [],
    error: null,
    setError: () => { },
    clearError: () => { },
    setTrade: () => { },
    clearTrade: () => { },
    setComments: () => { },
    addComment: () => { },
})

export default TradeContext

export class TradeProvider extends Component {
    state = {
        trade: nullTrade,
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

    setComments = comments => {
        this.setState({ comments })
    }

    clearTrade = () => {
        this.setTrade(nullTrade)
        this.setComments([])
    }

    addComment = comment => {
        this.setComments([
            ...this.state.comments,
            comment
        ])
    }

    render() {
        const value = {
            trade: this.state.trade,
            comments: this.state.comments,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setTrade: this.setTrade,
            setComments: this.setComments,
            clearTrade: this.clearTrade,
            addComment: this.addComment,
        }
        return (
            <TradeContext.Provider value={value}>
                {this.props.children}
            </TradeContext.Provider>
        )
    }

}