import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';

export default class AcceptButton extends Component {
    static defaultProps = {
        active: null,
    }

    handleAcceptTrade = ev => {
        ev.preventDefault()
    }

    render() {
        return (
            <div className='AcceptBtn'>
                <button type='submit' ><FontAwesomeIcon className='green' icon={faVoteYea} /></button>
            </div>
        )
    }
}