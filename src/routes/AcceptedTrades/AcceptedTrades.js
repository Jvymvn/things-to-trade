import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import AcceptedTradeItem from '../../components/AcceptedTradeItem/AcceptedTradeItem'


export default class AcceptedTrades extends Component {
    static contextType = TradeListContext;

    componentDidMount() {
        this.context.fetchTrades()
    }

    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };


    render() {
        const { tradeList } = this.context
        let parsedJwtPayload = this.parseJwt(localStorage.getItem('trade-client-auth-token'))

        const acceptedTrades = []
        tradeList.forEach(trade => {
            if (trade.user_id === parsedJwtPayload.user_id && trade.active === false) {
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