import React, { Component } from 'react'
import TradeListContext from '../../contexts/TradeListContext';
import TokenService from '../../services/token-service'
import config from '../../config'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import './AcceptedItem.css';

export default class AcceptedItem extends Component {
    static contextType = TradeListContext;

    render() {
        let parsedJwtPayload = TokenService.parseJwt(localStorage.getItem(config.JWT_TOKEN));
        return (
            <TradeListContext.Consumer>
                {(context) => (
                    <li className='TradeItem'>
                        <h3 className='TradeItem_title' className="gold">{this.props.title}</h3>
                        <div className='TradeItem_container'>
                            <div className="TradeItem_give">
                                <h1>You Give:</h1>
                                <div className='TradeItem_image_give'><img src={this.props.image1} alt='image1' /></div>
                            </div>

                            <FontAwesomeIcon className='gold' id='middle_icon2' icon={faExchangeAlt} />
                            {this.props.user_id === parsedJwtPayload.user_id ? <button>Delete</button> : null}
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