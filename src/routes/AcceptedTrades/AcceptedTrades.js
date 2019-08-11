import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import TradeListItem from '../../components/TradeListItem/TradeListItem'
import { Link } from 'react-router-dom';

export default class AcceptedTrades extends Component {
    static contextType = TradeListContext;
    render() {
        const { tradeList } = this.context
        const acceptedTrades = []
        tradeList.forEach(trade => {
            if (trade.active === false) {
                acceptedTrades.push(trade)
            }
        })
        return (
            <section>
                <h2>Accepted Trades</h2>
                <ul>
                    {acceptedTrades.map(trade =>
                        <TradeListItem key={trade.id} {...trade} />
                    )}
                </ul>
            </section>
        )
    }
}