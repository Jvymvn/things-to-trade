import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

//------------------- Components
import Header from '../Header/header'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
//--------------------

//---------------------- Services
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import IdleService from '../../services/idle-service'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import TradeContext from '../../contexts/TradeContext'
//--------------------------

//====================== Routes
import TradeListPage from '../../routes/TradeListPage/TradeListPage'
import AddTrade from '../AddTrade/AddTrade'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import MyTrades from '../../routes/MyTrades/MyTrades'
import LoginPage from '../../routes/LoginPage/LoginPage'

//----------------------------

class App extends Component {
  state = {
    hasError: false,
  };

  static contextType = TradeContext;

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timout will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
    this.context.logOutUser();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main className='App_main'>
          {this.state.hasError && <p className='red'>There was an error!</p>}
          <Switch>
            <PublicOnlyRoute exact path={'/'} component={RegistrationPage} />
            <PublicOnlyRoute path={'/login'} component={LoginPage} />
            <PrivateRoute path={'/trades'} component={TradeListPage} />
            <PrivateRoute path={'/my-trades'} component={MyTrades} />
            <PrivateRoute path={'/add-trade'} component={AddTrade} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App