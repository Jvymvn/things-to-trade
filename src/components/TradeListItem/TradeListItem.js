import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import TradeListContext from '../../contexts/TradeListContext';
import TokenService from '../../services/token-service';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import './TradeListItem.css'


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
        alert('Trade Accepted!')
        let parsedJwtToken = this.parseJwt(localStorage.getItem('trade-client-auth-token'))


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
                        <div className='TradeItem_post'>
                            <h3 className='TradeItem_title'>{this.props.title}</h3>
                            <div className="TradeItem_give">
                                <label>You Give:</label>
                                <div className='TradeItem_image_give'><img src={this.props.image1} alt='image1' /></div>
                            </div>
                            {' '}
                            <FontAwesomeIcon className='gold' icon={faExchangeAlt} />
                            {' '}
                            {/* <Link to={`/trades/${props.id}`}><AcceptButton trade={props} /></Link> */}
                            <button type='Button' id='Accept' onClick={() => this.updateTradeActive(this.props)}><FontAwesomeIcon className='green' icon={faVoteYea} /></button>
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