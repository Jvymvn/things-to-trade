import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from '../Header/header'
import TradeListPage from '../../routes/TradeListPage/TradeListPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     trades: [],
  //     showAddTrade: false
  //   };
  // }

  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true }
  }

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
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
