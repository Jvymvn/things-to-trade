import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from '../Header/header'
import TradeListPage from '../../routes/TradeListPage/TradeListPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
// import TradeDetailed from '../../routes/TradeDetailed/TradeDetailed';
import AcceptedTrades from '../../routes/AcceptedTrades/AcceptedTrades'
import AddTrade from '../AddTrade/AddTrade'

class App extends Component {

  state = {
    hasError: false,
  };



  render() {
    return (
      <div className="App">
        <header className='App_header'>
          <Header />
        </header>
        <main className='App_main'>
          {this.state.hasError && <p className='red'>There was an error!</p>}
          <Switch>
            <Route exact path={'/'} component={RegistrationPage} />
            <Route path={'/login'} component={LoginPage} />
            <Route path={'/trades'} component={TradeListPage} />
            {/* <Route path={'/trades/:tradeId'} component={TradeDetailed} /> */}
            <Route path={'/accepted'} component={AcceptedTrades} />
            <Route path={'/add-trade'} component={AddTrade} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;


// <Switch>
// <Redirect from='/' to='/dashboard'/>
// <Route path='/dashboard' render={(props) => (
// auth.isAuthenticated === true
// ? <Component {...props} />
// : <Redirect to='/login' />
// )} 
// />
// </Switch>