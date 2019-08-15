import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
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
            <div className='Header__logged-in'>
                <Link to='/add-trade' id='link'>
                    Add Trade
                </Link>
                {' '}
                <Link to='/trades' id='link'>
                    Active Trades
                </Link>
                {' '}
                <Link to='/accepted' id='link'>
                    Accepted Trades
                </Link>
                {' '}
                <Link
                    onClick={this.handleLogoutClick}
                    to='/' id='link'>
                    Logout
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/login' id='link'>
                    Log in
                </Link>
                {' '}
                <Link
                    to='/' id='link'>
                    Register
                </Link>
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
                    <div className="Header_title">
                        <h1 id='Main_title'>Things 2 Trade{' '}<FontAwesomeIcon className='gold' icon={faExchangeAlt} /></h1>
                    </div>
                    {loggedIn === true
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </nav>
            </>
        )
    }
}

export default Header;