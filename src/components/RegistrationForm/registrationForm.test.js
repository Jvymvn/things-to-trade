// make React available
import React from 'react';

//make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';

//make the RegistrationForm component available
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import { BrowserRouter } from 'react-router-dom';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<BrowserRouter><RegistrationForm /></BrowserRouter>, div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});
