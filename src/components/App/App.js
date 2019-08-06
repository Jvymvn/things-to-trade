import React, { Component } from 'react';
import './App.css';
import Header from '../Header/header'
// import TradeListPage from '../../routes/TradeListPage/TradeListPage'
// import LoginPage from '../../routes/LoginPage/LoginPage'
// import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
// import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trades: [],
      showAddTrade: false
    };
  }

  render() {
    return (
      <div className="App">
        <header className='App_header'>
          <Header />
        </header>
        {/* <TradeListPage /> */}
        {/* <LoginPage /> */}
        {/* <RegistrationPage /> */}
        {/* <NotFoundPage /> */}
      </div>
    );
  }
}

export default App;
