import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import AcceptedTradeItem from '../../components/AcceptedTradeItem/AcceptedTradeItem'
import TokenService from '../../services/token-service'
import config from '../../config'


export default class MyTrades extends Component {
    static contextType = TradeListContext;

    componentDidMount() {
        this.context.fetchTrades()
    }

    render() {
        const { tradeList } = this.context
        let parsedJwtPayload = TokenService.parseJwt(localStorage.getItem(config.JWT_TOKEN))
        const acceptedTrades = []

        tradeList.forEach(trade => {
            if (trade.claim_user === parsedJwtPayload.user_id && trade.active === false) {
                acceptedTrades.push(trade)
            }
        })

        return (
            <section className='TradeList'>
                <h2>Accepted Trades</h2>
                <ul className='TradeList_list' aria-live='polite'>
                    {acceptedTrades.map(trade =>
                        <AcceptedTradeItem key={trade.id} {...trade} />
                    )}
                </ul>
            </section>
        )
    }
}