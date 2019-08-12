import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import TradeListItem from '../../components/TradeListItem/TradeListItem'

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
                <h2>Active Trades:</h2>
                <ul className='TradeList_list' aria-live='polite'>
                    {/* {tradeList.map(trade => {
                        if (trade.active === true) {
                            return <TradeListItem key={trade.id} {...trade} history={this.props.history} />
                        }}
                    )} */}
                    {activeTrades.map(trade =>
                        <TradeListItem key={trade.id} {...trade} />
                    )}
                </ul>
            </section>
        );
    }
}

// renderTrades() {
//     // console.log(TRADES)
//     tradeList.forEach(trade => {
//         if (trade.active === true) {
//             newTrades.push(trade)
//         }
//     })
//     // console.log(newTrades)
//     return newTrades.map(trade =>
//         <TradeListItem key={trade.id} trade={trade} />
//     )
// }

    // render() {
    //     const { error } = this.context
    //     return (
    //         <Section list className='TradeListPage'>
    //             {error
    //                 ? <p className='red'>There was an error, try again</p>
    //                 : this.renderTrades()}
    //         </Section>
    //     )
    // }