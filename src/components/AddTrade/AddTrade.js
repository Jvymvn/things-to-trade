import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config'
import { Section, Input, Button } from '../../components/Utils/Utils'

//tradelistcontext tradecontext

const Required = () => (
    <span className='AddTrade_required'>*</span>
)

export default class AddTrade extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    // static contextType = TradeContext

    state = {
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault()

        const { title, image1, image2 } = e.target
        const trade = {
            title: title.value,
            image1: image1.value,
            image2: image2.value,
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(trade),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                title.value = ''
                image1.value = ''
                image2.value = ''
                this.context.addTrade(data)
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const { error } = this.state
        return (
            <Section className='AddTrade'>
                <h2>Create a trade post</h2>
                <form
                    className='AddTrade_form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddTrade__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='title'>
                            Title
                            {' '}
                            <Required />
                        </label>
                        <Input
                            type='text'
                            name='title'
                            id='title'
                            placeholder="I want to trade my Windows for a Mac"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='image1'>
                            You Give:
                            {' '}
                            <Required />
                        </label>
                        <Input
                            type='url'
                            name='image1'
                            id='image1'
                            placeholder='http://placekitten.com/200/300'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='image2'>
                            You Get:
                            {' '}
                            <Required />
                        </label>
                        <Input
                            type='url'
                            name='image2'
                            id='image2'
                            placeholder='http://placekitten.com/200/300'
                            required
                        />
                    </div>
                    <div className='AddTrade_buttons'>
                        <Button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </Button>
                        {' '}
                        <Button type='submit'>
                            Post Trade
                        </Button>
                    </div>
                </form>
            </Section>
        );
    }
}