import React, { Component } from 'react';
import { Button, Input, Required, Section } from '../Utils/Utils';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';

export default class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { error: null }

    handleSubmit = ev => {
        ev.preventDefault()
        const { full_name, user_name, password } = ev.target

        this.setState({ error: null })
        const passwordError = AuthApiService.validatePassword(password.value)

        if (passwordError)
            return this.setState({ error: passwordError })

        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            full_name: full_name.value,
        })
            .then(user => {
                full_name.value = ''
                user_name.value = ''
                password.value = ''
                this.props.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state;
        const style = {
            'textAlign': 'center',
            error: {
                color: 'red',
                'textAlign': 'center'
            }
        };
        return (
            <>
                <h2 style={style}>Register</h2>
                <div role='alert' style={style.error}>
                    {error && <p>{error}</p>}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <table align="center">
                        <tbody>
                    <tr>
                        <td><label>
                            Full name <Required />
                        </label></td>
                        <td>
                        <Input
                            name='full_name'
                            type='text'
                            required>
                        </Input>
                        </td>
                    </tr>
                    <tr>
                        <td><label>
                            User name <Required />
                        </label></td>
                        <td>
                        <Input
                            name='user_name'
                            type='text'
                            required>
                        </Input>
                        </td>
                    </tr>
                    <tr>
                        <td><label>
                            Password <Required />
                        </label></td>
                        <td>
                        <Input
                            name='password'
                            type='password'
                            required>
                        </Input>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colSpan="2"><Button type='submit' className="btn draw-border2">
                            Register
                        </Button></td>
                    </tr>
                    <tr>
                        <td align="center" colSpan="2">
                        <span>Already a member?</span>
                        <br />
                        <Link to='/login' id='link2' className="alreadyMem">Login</Link>
                        </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                </>
        )
    }
}