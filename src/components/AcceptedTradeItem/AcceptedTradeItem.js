import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import './AcceptedItem.css';

export default class AcceptedItem extends Component {
    static contextType = TradeListContext;

    render() {
        return (
            <TradeListContext.Consumer>
                {(context) => (
                    <li className='TradeItem'>
                        <h3 className='TradeItem_title' id="gold">{this.props.title}</h3>
                        <div className='TradeItem_container'>
                            <div className="TradeItem_give">
                                <h1>You Give:</h1>
                                <div className='TradeItem_image_give'><img src={this.props.image1} alt='image1' /></div>
                            </div>

                            <FontAwesomeIcon className='gold' id='middle_icon2' icon={faExchangeAlt} />

                            <div className='TradeItem_get'>
                                <h1>You Get:</h1>
                                <div className='TradeItem_image_get'><img src={this.props.image2} alt='image2' /></div>
                            </div>
                        </div>
                    </li>
                )}
            </TradeListContext.Consumer>
        )
    }
}