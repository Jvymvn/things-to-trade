import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import TradeListContext from '../../contexts/TradeListContext';
import TokenService from '../../services/token-service';
import '../../css/main.css'

const imgStyle = {
    width: '100%',
    height: 'auto',
}

export default class TradeItem extends Component {
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
        let parsedJwtToken = this.parseJwt(localStorage.getItem(config.JWT_TOKEN))

        fetch(`${config.API_ENDPOINT}/trades/${trade.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ active: false, claim_user: parsedJwtToken.user_id }),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))

            })
            .then(data => {
                this.context.updateTrade(trade.id, 'active', false)
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    render() {
        return (
            <TradeListContext.Consumer>
                {(context) => (
                    <li className='TradeItem'>
                        <h1 className='TradeItem_title'>{this.props.title}</h1>
                        <div className='TradeItem_container'>
                            <div className="TradeItem_give">
                                <h1>You Give:</h1>
                                <img src={this.props.image1} alt='image1' style={imgStyle} />
                            </div>
                            <div className='TradeItem_middle'>
                                <FontAwesomeIcon className='gold' id='middle_icon' icon={faExchangeAlt} /><br />
                                <button type='Button' id='Accept' onClick={() => this.updateTradeActive(this.props)}><span>Accept</span></button>
                            </div>
                            <div className='TradeItem_get'>
                                <h1>You Get:</h1>
                                <img src={this.props.image2} alt='image2' style={imgStyle} />
                            </div>
                        </div>
                    </li>
                )}
            </TradeListContext.Consumer>
        )
    }
}

// deleteTradeRequest = (tradeId) => {
//     fetch(`${config.API_ENDPOINT}/trades`, {
//         method: 'DELETE',
//         headers: {
//             'content-type': 'application/json',
//             'authorization': `bearer ${TokenService.getAuthToken()}`
//         }
//     })
//         .then(res => {
//             if (!res.ok) {
//                 return res.json().then(error => {
//                     throw error
//                 })
//             }
//             return res.json()
//         })
//         .then(data => {
//             cb(tradeId)
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }