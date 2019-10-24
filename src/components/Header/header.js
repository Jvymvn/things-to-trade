import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import TradeContext from '../../contexts/TradeContext';
import IdleService from '../../services/idle-service'
import './header.css'



class Header extends Component {
    static contextType = TradeContext


    handleLogoutClick = () => {
        const { logOutUser } = this.context
        logOutUser()
        TokenService.clearAuthToken()
        /* when logging out, clear the callbacks to the refresh api and idle auto logout */
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
    }

    renderLogoutLink() {
        return (
            <div>
                <div className="Header_title">
                    <h1 id='Main_title'>Things 2 Trade{' '}<FontAwesomeIcon className='gold' icon={faExchangeAlt} /></h1>
                </div>
                <ul className="Header-logged-in">
                    <li><NavLink to='/add-trade' activeClassName="active">
                        Add Trade
                </NavLink></li>
                    <li><NavLink to='/trades' activeClassName="active">
                        Active Trades
                </NavLink></li>
                    <li><NavLink to='/accepted' activeClassName="active">
                        Accepted Trades
                </NavLink></li>
                    <li><NavLink
                        onClick={this.handleLogoutClick}
                        exact to='/'>
                        Logout
                </NavLink></li>
                </ul>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div>
                <div className="Header_title">
                    <h1 id='Main_title'>Things 2 Trade{' '}<FontAwesomeIcon className='gold' icon={faExchangeAlt} /></h1>
                </div>
                <ul className='Header-log-in'>
                    <li><NavLink
                        to='/login'>
                        Log in
                </NavLink></li>
                    <li><NavLink
                        exact to='/'>
                        Register
                </NavLink></li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        const { logInUser } = this.context
        if (TokenService.hasAuthToken()) {
            logInUser()
        }
    }



    render() {
        const { loggedIn } = this.context
        return (
            <>
                <nav className="Header">
                    {loggedIn === true
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </nav>
            </>
        )
    }
}

export default Header;