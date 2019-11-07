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
        const tradeList = this.context.myTrades.map((trade, i) => (
            <AcceptedTradeItem key={trade.id} deleteTradeRequest={this.deleteTradeRequest.bind(this)} {...trade}/>
        ));
        return(
            <ul>
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
            <section>
                <h2>My trades</h2>
                <ul>
                    {/* {usertrades.map(tradeItm => 
                        <AcceptedTradeItem key={tradeItm.id} {...tradeItm}/>
                    )} */}
                    {this.renderMyTrades()}
                </ul>
            </section>
            <section className='TradeList'>
                <h2>Accepted Trades</h2>
                <ul className='TradeList_list' aria-live='polite'>
                    {/* {acceptedTrades.map(trade =>
                        <AcceptedTradeItem key={trade.id} {...trade} />
                    )} */}
                    
                </ul>
            </section>
            </>
        )
    }
}