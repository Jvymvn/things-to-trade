import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../components/Utils/Utils'
import TradeContext from '../../contexts/TradeContext';


export default class LoginPage extends Component {

    static contextType = TradeContext

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/trades'
        history.push(destination)
        const { logInUser } = this.context
        logInUser()
    }

    render() {
        return (
            <Section className='LoginPage'>
                <h2>Login</h2>
                <LoginForm onLoginSuccess={this.handleLoginSuccess} />
            </Section>
        )
    }
}