import React, { Component, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
// import TradeContext from '../../contexts/TradeContext';
// import TokenService from '../../services/token-service';



export default class AcceptButton extends Component {
    static defaultProps = {
        active: null,
        // history: {
        //     push: () => { },
        // },
    }







    handleAcceptTrade = () => {
        const { history } = useState('')
        const { trade } = this.props
        // ev.preventDefault()
        console.log('TradeAccepted', trade)
        const { active } = trade
        console.log(active)
        const acceptedTrade = {
            active: false
        }

        fetch(`${config.API_ENDPOINT}/trades/${trade.id}`, {
            method: 'PATCH',
            body: JSON.stringify(acceptedTrade),
            headers: {
                'content-type': 'application/json',
                // 'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))

                // this.context.updateBookmark(data)
                // this.props.history.push('/trades')

            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })

    }

    render() {
        return (
            <div className='AcceptBtn'>
                <button type='button' onClick={this.handleAcceptTrade}><FontAwesomeIcon className='green' icon={faVoteYea} /></button>
            </div>
        )
    }
}

