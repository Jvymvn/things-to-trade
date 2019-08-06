import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
// import TradeApiService from '../../services'
import { Section } from '../../components/Utils/Utils'
import TradeListItem from '../../components/TradeListItem/TradeListItem'

export default class TradeListPage extends Component {
    static contextType = TradeListContext

    // componentDidMount() {
    //     this.context.clearError()
    //     TradeApiService.getTrades()
    //       .then(this.context.setTradeList)
    //       .catch(this.context.setError)
    //   }


    renderTrades() {
        // const { tradeList = [] } = this.context
        const TRADES = [
            { "title": "Post title 1", "image1": "http://placekitten.com/200/300", "image2": "http://placekitten.com/200/300" },
            { "title": "Post title 2", "image1": "http://placekitten.com/200/300", "image2": "http://placekitten.com/200/300" },
            { "title": "Post title 3", "image1": "http://placekitten.com/200/300", "image2": "http://placekitten.com/200/300" },
        ];
        console.log(TRADES)
        return TRADES.map(trade =>
            <TradeListItem key={trade.id} trade={trade} />
        )
    }

    render() {
        const { error } = this.context
        return (
            <Section list className='TradeListPage'>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderTrades()}
            </Section>
        )
    }
}