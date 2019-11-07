import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import TradeContext from '../../contexts/TradeContext';
import IdleService from '../../services/idle-service'

import '../../css/main.css'

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
                <ul className="menu">
                    <li className="menu__item"><NavLink to='/add-trade' className="menu__link" ><span className="menu__title"><span className="menu__first-word" data-hover="Add">Add</span><span> </span><span className="menu__second-word" data-hover="Trade">Trade</span></span></NavLink></li>
                    <li className="menu__item"><NavLink to='/trades' className="menu__link" ><span className="menu__title"><span className="menu__first-word" data-hover="Active">Active</span><span> </span><span className="menu__second-word" data-hover="Trades">Trades</span></span></NavLink></li>
                    <li className="menu__item"><NavLink to='/my-trades' className="menu__link" ><span className="menu__title"><span className="menu__first-word" data-hover="My">My</span><span> </span><span className="menu__second-word" data-hover="Trades">Trades</span></span></NavLink></li>
                    <li className="menu__item"><NavLink onClick={this.handleLogoutClick} exact to='/' className="menu__link"><span className="menu__title"><span className="menu__first-word" data-hover="Sign">Sign</span><span> </span><span className="menu__second-word" data-hover="out">out</span></span></NavLink></li>
                </ul>
        )
    }

    renderLoginLinks() {
        return (
                <ul className='menu'>
                    <li className="menu__item"><NavLink to='/login' className="menu__link"><span className="menu__title"><span className="menu__first-word" data-hover="Log">Log</span><span> </span><span className="menu__second-word" data-hover="In">In</span></span></NavLink></li>
                    <li className="menu__item"><NavLink exact to='/' className="menu__link"><span className="menu__title"><span className="menu__first-word" data-hover="Create">Create</span><span> </span><span className="menu__second-word" data-hover="Account">Account</span></span></NavLink></li>
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
                <h1 className='site-title'>Things <span className="green">2</span> Trade{' '}<FontAwesomeIcon className='gold' icon={faExchangeAlt} /></h1>
                <nav className="navigation">
                    {loggedIn === true
                        ? this.renderLogoutLinks()
                        : this.renderLoginLinks()}
                </nav>
            </div>
        )
    }
}

export default Header;