import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import TradeListItem from '../../components/TradeListItem/TradeListItem'
import TokenService from '../../services/token-service'
import TradeApiService from '../../services/trade-api-service';


export default class TradeListPage extends Component {
    static defaultProps = {
        tradeList: []
    };

    state = { error: null }

    static contextType = TradeListContext;

    componentDidMount() {
        TradeApiService.getTrades()
        .then(data => this.context.setTradeList(data))
        .catch(res => this.setState({ error: res.error }))
    }

    render() {
        const { tradeList } = this.context
        //----------------------
        const activeTrades = [];

        if (TokenService.hasAuthToken() === false) {
            return <p>Must login to see trades</p>
        } else {
            tradeList.forEach(trade => {
                if (trade.active === true) {
                    activeTrades.push(trade)
                }
            })
        }
        //----------------------
        return (
            <section className='TradeList'>
                <h2 className="sectionTitle">Active Trades</h2>
                <ul className='TradeList_list' aria-live='polite'>

                    {activeTrades.map(trade =>
                        <TradeListItem key={trade.id} {...trade} />
                    )}

                </ul>
            </section>
        );
    }
}