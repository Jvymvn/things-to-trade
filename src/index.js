import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import { TradeListProvider } from './contexts/TradeListContext'
import { TradeProvider } from './contexts/TradeContext'




ReactDOM.render(
    <BrowserRouter>
        <TradeListProvider>
            <TradeProvider>
                <App />
            </TradeProvider>
        </TradeListProvider>
    </BrowserRouter>,
    document.getElementById('root'));


serviceWorker.unregister();
