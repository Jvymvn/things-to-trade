import React from 'react';
import ReactDOM from 'react-dom';
import TradeItem from './TradeListItem';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TradeItem />, div);
    ReactDOM.unmountComponentAtNode(div);
})