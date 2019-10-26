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
        //------------ Accepted Trades
        const { tradeList } = this.context;
        let parsedJwtPayload = TokenService.parseJwt(localStorage.getItem(config.JWT_TOKEN));
        const acceptedTrades = [];
        tradeList.forEach(trade => {
            if (trade.claim_user === parsedJwtPayload.user_id && trade.active === false) {
                acceptedTrades.push(trade);
            }
        })
        ///////////////////
        //------------- My trades
        const usertrades = [];
        tradeList.forEach(item => {
            if(item.user_id === parsedJwtPayload.user_id){
                usertrades.push(item);
            }
        })

        ////////////////

        return (
            <>
            <section>
                <h2>My trades</h2>
                <ul>
                    {usertrades.map(tradeItm => 
                        <AcceptedTradeItem key={tradeItm.id} {...tradeItm}/>
                    )}
                </ul>
            </section>
            <section className='TradeList'>
                <h2>Accepted Trades</h2>
                <ul className='TradeList_list' aria-live='polite'>
                    {acceptedTrades.map(trade =>
                        <AcceptedTradeItem key={trade.id} {...trade} />
                    )}
                </ul>
            </section>
            </>
        )
    }
}