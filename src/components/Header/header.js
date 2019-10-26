import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import TradeContext from '../../contexts/TradeContext';
import IdleService from '../../services/idle-service'

import './Header.css'

class Header extends Component {

    static contextType = TradeContext;


    handleLogoutClick = () => {
        const { logOutUser } = this.context;
        logOutUser();
        TokenService.clearAuthToken();
        /* when logging out, clear the callbacks to the refresh api and idle auto logout */
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }

    renderLogoutLinks() {
        return (
                <ul className="Nav">
                    <li><NavLink to='/add-trade' activeClassName="active">Add Trade</NavLink></li>
                    <li><NavLink to='/trades' activeClassName="active">Trades</NavLink></li>
                    <li><NavLink to='/my-trades' activeClassName="active">My Trades</NavLink></li>
                    <li><NavLink onClick={this.handleLogoutClick} exact to='/'>Logout</NavLink></li>
                </ul>
        )
    }

    renderLoginLinks() {
        return (
                <ul className='Nav'>
                    <li><NavLink to='/login' activeClassName="active">Log in</NavLink></li>
                    <li><NavLink exact to='/' activeClassName="active">Register</NavLink></li>
                </ul>
        )
    }

    componentDidMount() {
        const { logInUser } = this.context
        if (TokenService.hasAuthToken()) {
            logInUser();
        }
    }



    render() {
        const { loggedIn } = this.context
        return (
            <div className="Navigation-bar">
                <h1 className='site-title'>Things 2 Trade{' '}<FontAwesomeIcon className='gold' icon={faExchangeAlt} /></h1>
                <nav>
                    {loggedIn === true
                        ? this.renderLogoutLinks()
                        : this.renderLoginLinks()}
                </nav>
            </div>
        )
    }
}

export default Header;