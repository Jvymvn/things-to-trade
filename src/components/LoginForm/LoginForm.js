import React, { Component } from 'react'
import { Button, Input, Section } from '../Utils/Utils'
// import TokenService from '../../services/token-service'
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
                // TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        const style = {
            'text-align': 'center',
            error: {
                color: 'red',
                'text-align': 'center'
            }
        }
        return (
            <>
                <h2 style={style}>Log In</h2>
                <div role='alert' style={style.error}>
                    {error && <p>{error}</p>}
                </div>
                <form onSubmit={this.handleSubmitJwtAuth}>
                    <table border="3" align="center">
                        <tr>
                        <td><label>UserName</label></td>
                        <td>
                        <Input
                            required
                            name='user_name'/>
                        </td>
                        </tr>
                        <tr>
                        <td><label>Password</label></td>
                        <td>
                        <Input
                            required
                            name='password'
                            type='password'/>
                        </td>
                        </tr>
                        <tr>
                        <td align="center" colSpan="2">
                            <Button type='submit'>
                            Login
                        </Button></td>
                        </tr>
                    </table>
                </form>
                </>
        )
    }
}


/**
 * 
 * <Section className='container'>
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
                            className='Inn'>
                        </Input>
                    </div>
                    <div className='row'>
                        <label htmlFor='LoginForm__password'>Password</label>
                        <Input
                            required
                            name='password'
                            type='password'
                            className='Inn'>
                        </Input>
                    </div>
                    <div className='row'>
                        <Button type='submit' id='sub'>
                            Login
                </Button>
                    </div>
                </form>
            </Section>
 */