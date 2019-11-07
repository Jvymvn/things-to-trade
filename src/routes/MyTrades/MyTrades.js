import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import AcceptedTradeItem from '../../components/AcceptedTradeItem/AcceptedTradeItem'
import TokenService from '../../services/token-service'
import config from '../../config';
import TradeApiService from '../../services/trade-api-service';


export default class MyTrades extends Component {
    static contextType = TradeListContext;
    state = {error: null}

    componentDidMount() {
        let parsedJwtPayload = TokenService.parseJwt(localStorage.getItem(config.JWT_TOKEN));
        this.context.setUserId(parsedJwtPayload.user_id);
       TradeApiService.getTrades()
       .then(data => {
           this.context.setTradeList(data);
           this.context.setMyTrades();
        })
       .catch(res => this.setState({error: res.error}));
    }

    renderMyTrades(){
        const tradeList = this.context.myTrades.map((trade) => (
            <AcceptedTradeItem key={trade.id} deleteTradeRequest={this.deleteTradeRequest.bind(this)} {...trade}/>
        ));
        return(
            <ul className='TradeList_list' aria-live='polite'>
                {tradeList}
            </ul>
        );
    }

    renderAcceptedTrades(){
        const tradeList = this.context.tradeList.map((trade) => {
            if(trade.claim_user === this.context.userId && trade.active === false){
                return <AcceptedTradeItem key={trade.id} {...trade} />
            }
        });
        return(
            <ul className='TradeList_list' aria-live='polite'>
                {tradeList}
            </ul>
        );
    }

    deleteTradeRequest = (tradeId) => {

        TradeApiService.deleteTrade(tradeId)
        .then(TradeApiService.getTrades()
        .then(data => {
            this.context.setTradeList(data);
            this.context.setMyTrades();
         }))
        .catch(error => {
            console.error(error)
        });
    }

    render() {

        return (
            <>
            <section className='TradeList'>
                <h2>My Trades</h2>
                    {this.renderMyTrades()}
            </section>
            <section className='TradeList'>
                <h2>Accepted Trades</h2>
                    {this.renderAcceptedTrades()}
            </section>
            </>
        )
    }
}