import React, { Component } from 'react';
import { Button, Input, Required } from '../Utils/Utils';
import { Link } from 'react-router-dom';

export default class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { error: null }

    render() {
        const { error } = this.state
        return (
            <form className='RegistrationForm'>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='full_name'>
                    <label htmlFor='RegistrationForm__full_name'>
                        Full name <Required />
                    </label><br />
                    <Input
                        name='full_name'
                        type='text'
                        required
                        id='RegistrationForm__full_name'>
                    </Input>
                </div>
                <div className='user_name'>
                    <label htmlFor='RegistrationForm__user_name'>
                        User name <Required />
                    </label><br />
                    <Input
                        name='user_name'
                        type='text'
                        required
                        id='RegistrationForm__user_name'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='RegistrationForm__password'>
                        Password <Required />
                    </label><br />
                    <Input
                        name='password'
                        type='password'
                        required
                        id='RegistrationForm__password'>
                    </Input>
                </div>
                <Button type='submit'>
                    Register
                </Button><br />
                <span>Already a member?</span><br />
                <Link to='/login'>Login</Link>
            </form>
        )
    }
}