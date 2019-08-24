// make React available
import React from 'react';

//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';

//make the AcceptedTrade component available
import AcceptedTrade from '../AcceptedTradeItem/AcceptedTradeItem'

it('renders without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<AcceptedTrade />, div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});