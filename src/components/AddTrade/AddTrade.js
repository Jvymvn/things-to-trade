import React, { Component } from 'react';
import { Section, Button } from '../../components/Utils/Utils';
import TradeListContext from '../../contexts/TradeListContext'
import TokenService from '../../services/token-service';
import TradeApiService from '../../services/trade-api-service'
import config from '../../config';
import './AddTrade.css'

const Required = () => (
    <span className='AddTrade_required'>*</span>
)

export default class AddTrade extends Component {
    static contextType = TradeListContext;

    state = {
        title: '',
        image1: '',
        image2: '',
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault()

        let parsedJwtPayload = TokenService.parseJwt(localStorage.getItem(config.JWT_TOKEN))

        const trade = {
            title: this.state.title,
            image1: this.state.image1,
            image2: this.state.image2,
            user_id: parsedJwtPayload.user_id,
        }

        this.setState({ error: null })

        TradeApiService.postTrade(trade)
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
            <Section className='container'>
                <h2>Create a trade post</h2>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddTrade__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div className='row'>
                        <div className="col-25">
                            <label htmlFor='title'>
                                Title
                            {' '}
                                <Required />
                            </label>
                        </div>
                        <div className="col-75">
                            <input
                                type='text'
                                name='title'
                                className='In-st'
                                id='title'
                                placeholder="I want to trade my Windows for a Mac"
                                required
                                onChange={this.handleTitleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-25">
                            <label htmlFor='image1'>
                                You Give:
                            {' '}
                                <Required />
                            </label>
                        </div>
                        <div className="col-75">
                            <input
                                type='url'
                                name='image1'
                                className='In-st'
                                id='image1'
                                placeholder='http://placekitten.com/200/300'
                                required
                                onChange={this.handleImage1Change}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-25">
                            <label htmlFor='image2'>
                                You Get:
                            {' '}
                                <Required />
                            </label>
                        </div>
                        <div className="col-75">
                            <input
                                type='url'
                                name='image2'
                                className='In-st'
                                id='image2'
                                placeholder='http://placekitten.com/200/300'
                                required
                                onChange={this.handleImage2Change}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <Button type='button' id='sub' onClick={this.handleClickCancel}>
                            Cancel
                        </Button>
                        {' '}
                        <Button type='submit' id='sub' onClick={this.handleSubmit}>
                            Post Trade
                        </Button>
                    </div>
                </form>
            </Section>
        );
    }
}