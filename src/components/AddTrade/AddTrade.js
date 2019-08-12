import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import config from '../../config';
import { Section, Input, Button } from '../../components/Utils/Utils';
import TradeListContext from '../../contexts/TradeListContext'
import TokenService from '../../services/token-service';


const Required = () => (
    <span className='AddTrade_required'>*</span>
)

export default class AddTrade extends Component {
    // static propTypes = {
    //     history: PropTypes.shape({
    //         push: PropTypes.func,
    //     }).isRequired,
    // };

    static contextType = TradeListContext;

    state = {
        title: '',
        image1: '',
        image2: '',
        error: null,
    };

    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    handleSubmit = e => {
        e.preventDefault()

        let parsedJwtPayload = this.parseJwt(localStorage.getItem('trade-client-auth-token'))
        console.log(parsedJwtPayload)

        const trade = {
            title: this.state.title,
            image1: this.state.image1,
            image2: this.state.image2,
            user_id: parsedJwtPayload.user_id,
        }
        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/trades`, {
            method: 'POST',
            body: JSON.stringify(trade),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                this.setState({
                    title: '',
                    image1: '',
                    image2: '',
                })
                this.context.addTrade(data)
                this.props.history.push('/trades')
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })
    }

    handleTitleChange = (ev) => {
        // console.log(ev.target.value)
        this.setState({ title: ev.target.value })
    }

    handleImage1Change = (ev) => {
        // console.log(ev.target.value)
        this.setState({ image1: ev.target.value })
    }

    handleImage2Change = (ev) => {
        // console.log(ev.target.value)
        this.setState({ image2: ev.target.value })
    }

    handleClickCancel = () => {
        this.props.history.push('/trades')
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
                            onChange={this.handleTitleChange}
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
                            onChange={this.handleImage1Change}
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
                            onChange={this.handleImage2Change}
                        />
                    </div>
                    <div className='AddTrade_buttons'>
                        <Button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </Button>
                        {' '}
                        <Button type='submit' onClick={this.handleSubmit}>
                            Post Trade
                        </Button>
                    </div>
                </form>
            </Section>
        );
    }
}