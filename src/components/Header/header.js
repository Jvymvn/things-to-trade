import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import TradeContext from '../../contexts/TradeContext';
import './header.css'

class Header extends Component {
    static contextType = TradeContext


    handleLogoutClick = () => {
        const { logOutUser } = this.context
        logOutUser()
        TokenService.clearAuthToken()
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link to='/add-trade'>
                    Add Trade
                </Link>
                {' '}
                <Link to='/trades'>
                    Active Trades
                </Link>
                {' '}
                <Link to='/accepted'>
                    Completed Trades
                </Link>
                {' '}
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/login'>
                    Log in
                </Link>
                {' '}
                <Link
                    to='/'>
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
                        <h1>Things 2 Trade{' '}<FontAwesomeIcon className='gold' icon={faExchangeAlt} /></h1>
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