import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import './header.css'

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="Header_title">
                    <h1>Things 2 Trade <FontAwesomeIcon className='gold' icon={faExchangeAlt} /></h1>
                </div>
            </div>
        )
    }
}

export default Header;