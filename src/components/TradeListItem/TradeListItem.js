import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import TradeListContext from '../../contexts/TradeListContext';
import TokenService from '../../services/token-service';

export default class TradeItem extends Component {

    state = { error: null }

    static contextType = TradeListContext;

    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };


    updateTradeActive = (trade) => {
        let parsedJwtToken = this.parseJwt(localStorage.getItem(config.JWT_TOKEN));

        if(trade.user_id === parsedJwtToken.user_id){
            console.error("Cannot accept trades you posted.");
            this.setState({error: "Cannot accept trades you posted."})
        } else {
            const options = {
                method: 'PATCH',
                body: JSON.stringify({ active: false, claim_user: parsedJwtToken.user_id }),
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }

            fetch(`${config.API_ENDPOINT}/trades/${trade.id}`, options)
                .then(res => {
                    if (!res.ok)
                        return res.json().then(error => Promise.reject(error))
    
                })
                .then(() => {
                    this.context.updateTrade(trade.id, 'active', false)
                })
                .catch(error => {
                    console.error(error)
                    this.setState(error)
                })
        }
    }

    render() {
        const style = {
            'textAlign': 'center',
            error: {
                color: 'red',
                'textAlign': 'center'
            }
        };

        const { error } = this.state;
        return (
            <li className='TradeItem'>
            <h3 className='TradeItem_title'>{this.props.title}</h3>
            <div className='TradeItem_container'>
                <div className="TradeItem_give">
                    <h1>You Give:</h1>
                    <div className='TradeItem_image_give'><img src={this.props.image1} alt='image1' /></div>
                </div>
                <div className='TradeItem_middle'>
                    <FontAwesomeIcon id='middle_icon' icon={faExchangeAlt} /><br />
                    <button type='Button' className="btn draw-border" onClick={() => this.updateTradeActive(this.props)}>Accept Trade</button>
                </div>
                <div className='TradeItem_get'>
                    <h1>You Get:</h1>
                    <div className='TradeItem_image_get'><img src={this.props.image2} alt='image2' /></div>
                </div>
            </div>
            </li>
        )
    }
}