import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import TradeListItem from '../../components/TradeListItem/TradeListItem'
import { Link } from 'react-router-dom';

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
            console.log(trade)
            console.log(parsedJwtPayload.user_id)
            if (trade.user_id === parsedJwtPayload.user_id) {
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