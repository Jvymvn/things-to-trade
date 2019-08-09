import React, { Component } from 'react'
import AcceptButton from '../AcceptTradeBtn/AcceptTradeBtn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'


export default class ThingListItem extends Component {
    render() {
        const { trade } = this.props

        return (
            <div className='TradeListItem'>
                <h2 className='TradeListTitle__title'>{trade.title}</h2>
                <div className="TradeTerm__one">
                    <label>You Give:</label>
                    <div className='TradeListItem__image1'><img src={trade.image1} alt='image1' /></div>
                </div>
                <FontAwesomeIcon className='gold' icon={faExchangeAlt} />
                <Link to={`/trades/${trade.id}`}><AcceptButton trade={trade} /></Link>
                <div className='TradeTerm__two'>
                    <label>You Get:</label>
                    <div className='TradeListItem__image2'><img src={trade.image2} alt='image2' /></div>
                </div>
            </div>
        )
    }
}
