import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext'
import TradeApiService from '../../services/trade-api-service'
import { Section } from '../../components/Utils/Utils'
import TradeListItem from '../../components/TradeListItem/TradeListItem'

export default class TradeListPage extends Component {
    static contextType = TradeListContext

    componentDidMount() {
        this.context.clearError()
        TradeApiService.getTrades()
            .then(this.context.setTradeList)
            .catch(this.context.setError)
    }


    renderTrades() {
        const { tradeList = [] } = this.context
        console.log(tradeList)

        const newTrades = [];
        // console.log(TRADES)
        tradeList.forEach(trade => {
            if (trade.active === true) {
                newTrades.push(trade)
            }
        })
        // console.log(newTrades)
        return newTrades.map(trade =>
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