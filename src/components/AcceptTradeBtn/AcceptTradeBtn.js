import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';

export default function AcceptButton() {
    return (
        <div className='AcceptBtn'>
            <button type='submit'><FontAwesomeIcon className='green' icon={faVoteYea} /></button>
        </div>
    )
}