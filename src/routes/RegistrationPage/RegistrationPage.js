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
                {/* Landing Message */}
                <div className='landing_message'>
                    <h1>WELCOME TO THINGS 2 TRADE!</h1>
                    <p> "TRADING EASY AS 1,2,3!" <br /><br />1. Post a trade to our list of active trades using our ADD-TRADE form.<br /><br />
                        Trades consist of a 'GIVE,' what you will give in the trade,<br /> and a 'GET,' what you will receive from the trade.
                    <br /><br />2. Accept trades by pressing the ACCEPT button on a trade.<br /><br />3. View trades you accept by pressing the COMPLETED-TRADES button.</p>
                    <p>"Best of all, trading is free! Sign-up now & trade today!"</p>
                </div>
                <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} />
            </Section>
        )
    }
}