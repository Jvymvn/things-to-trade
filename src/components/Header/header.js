import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import TokenService from '../../services/token-service';
import './header.css'

class Header extends Component {
    // handleLogoutClick = () => {
    //     TokenService.clearAuthToken()
    // }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link
                    //   onClick={this.handleLogoutClick}
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
                <Link
                    to='/'>
                    Register
            </Link>
            </div>
        )
    }

    render() {
        return (
            <>
                <nav className="Header">
                    <div className="Header_title">
                        <h1><Link to='/trades'>Things 2 Trade{' '}<FontAwesomeIcon className='gold' icon={faExchangeAlt} /></Link></h1>
                    </div>
                    {/* {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()} */}
                </nav>
            </>
        )
    }
}

export default Header;