import React, { Component } from 'react'
import { Button, Input, Section } from '../Utils/Utils'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'


export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state = { error: null }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target

        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
            .then(res => {
                user_name.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <Section className='container'>
                <h2>Log In</h2>
                <form onSubmit={this.handleSubmitJwtAuth}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='row'>
                        <label htmlFor='LoginForm__user_name'>User name</label>
                        <Input
                            required
                            name='user_name'
                            id='Inn'>
                        </Input>
                    </div>
                    <div className='row'>
                        <label htmlFor='LoginForm__password'>Password</label>
                        <Input
                            required
                            name='password'
                            type='password'
                            id='Inn'>
                        </Input>
                    </div>
                    <div className='row'>
                        <Button type='submit' id='sub'>
                            Login
                </Button>
                    </div>
                </form>
            </Section>
        )
    }
}