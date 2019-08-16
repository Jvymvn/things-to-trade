import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import TradeListItem from '../../components/TradeListItem/TradeListItem'
import '../../css/main.css'

export default class TradeListPage extends Component {
    static defaultProps = {
        tradeList: []
    };

    static contextType = TradeListContext;

    componentDidMount() {
        this.context.fetchTrades()
    }

    render() {
        const { tradeList } = this.context
        //----------------------
        const activeTrades = [];
        tradeList.forEach(trade => {
            if (trade.active === true) {
                activeTrades.push(trade)
            }
        })
        //----------------------
        return (
            <section className='TradeList'>
                <h2>Active Trades</h2>
                <ul className='TradeList_list' aria-live='polite'>

                    {activeTrades.map(trade =>
                        <TradeListItem key={trade.id} {...trade} />
                    )}

                </ul>
            </section>
        );
    }
}