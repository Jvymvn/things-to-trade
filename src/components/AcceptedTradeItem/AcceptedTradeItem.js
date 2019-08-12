import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export default class AcceptedItem extends Component {
    static contextType = TradeListContext;

    render() {
        return (
            <TradeListContext.Consumer>
                {(context) => (
                    <li className='TradeItem'>
                        <div className='TradeItem_post'>
                            <h3 className='TradeItem_title'>{this.props.title}</h3>
                            <div className="TradeItem_give">
                                <label>You Give:</label>
                                <div className='TradeItem_image_give'><img src={this.props.image1} alt='image1' /></div>
                            </div>
                            {' '}
                            <FontAwesomeIcon className='gold' icon={faExchangeAlt} />
                            {' '}
                            <div className='TradeItem_get'>
                                <label>You Get:</label>
                                <div className='TradeItem_image_get'><img src={this.props.image2} alt='image2' /></div>
                            </div>
                        </div>
                    </li>
                )}
            </TradeListContext.Consumer>
        )
    }
}