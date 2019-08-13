import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import { Section } from '../../components/Utils/Utils'
import './Landing.css'

export default class RegistrationPage extends Component {
    static defaultProps = {
        history: {
            push: () => { },
        },
    }

    handleRegistrationSuccess = user => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <Section className='RegistrationPage'>
                <div id='landing_message'>
                    <h1>WELCOME TO THINGS 2 TRADE!</h1>
                    <p> "Trading is simple, post a trade to our list of active trades,<br /> when another user accepts
                        the trade, the trade is removed from the active list,<br /> and displayed in a list of completed
                        trades!"
                </p>
                    <p>"Best of all, trading is free! Sign-up now & trade today!"</p>
                </div>
                <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} />
            </Section>
        )
    }
}