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
        console.log(ev.target)

        this.setState({ error: null })
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
        const { error } = this.state
        return (
            <Section className='container'>
                <h2 className='row'>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='row'>
                        <label htmlFor='RegistrationForm__full_name'>
                            Full name <Required />
                        </label><br />
                        <Input
                            name='full_name'
                            type='text'
                            required
                            id='Inn'>
                        </Input>
                    </div>
                    <div className='row'>
                        <label htmlFor='RegistrationForm__user_name'>
                            User name <Required />
                        </label><br />
                        <Input
                            name='user_name'
                            type='text'
                            required
                            id='Inn'>
                        </Input>
                    </div>
                    <div className='row'>
                        <label htmlFor='RegistrationForm__password'>
                            Password <Required />
                        </label><br />
                        <Input
                            name='password'
                            type='password'
                            required
                            id='Inn'>
                        </Input>
                    </div>
                    <div className='row'>
                        <Button type='submit' id='sub'>
                            Register
                </Button>
                    </div>
                    <br />
                    <div className='Already_reg'>
                        <span>Already a member?</span>
                        <br />
                        <Link to='/login' id='link2'>Login</Link>
                    </div>
                </form>
            </Section>
        )
    }
}