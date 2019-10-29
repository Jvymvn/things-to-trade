import React, { Component } from 'react';
import { Section, Button } from '../../components/Utils/Utils';
import TradeListContext from '../../contexts/TradeListContext'
import TokenService from '../../services/token-service';
import TradeApiService from '../../services/trade-api-service'
import config from '../../config';

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
        e.preventDefault();
        let parsedJwtPayload = TokenService.parseJwt(localStorage.getItem(config.JWT_TOKEN));

        const trade = {
            title: this.state.title,
            image1: this.state.image1,
            image2: this.state.image2,
            user_id: parsedJwtPayload.user_id
        };

        this.setState({ error: null });

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
                console.error(error)
                this.setState({ error })
            });
    };

    handleTitleChange = (ev) => {
        // console.log(ev.target.value)
        this.setState({ title: ev.target.value })
    };

    handleImage1Change = (ev) => {
        // console.log(ev.target.value)
        this.setState({ image1: ev.target.value })
    };

    handleImage2Change = (ev) => {
        // console.log(ev.target.value)
        this.setState({ image2: ev.target.value })
    };

    handleClickCancel = () => {
        this.props.history.push('/trades')
    };

    render() {
        const { error } = this.state;
        const style = {
            'text-align': 'center',
        }
        return(
            <>
            <h2 style={style}>Create a trade post</h2>
            <div role='alert'>
                {error && <p>{error.message}</p>}
            </div>
            <form>
            <table border="3" align="center">
                <tr>
                    <td><label>
                                Title
                            {' '}
                                <Required />
                            </label></td>
                    <td><input
                                type='text'
                                name='title'
                                id='title'
                                placeholder="Windows for a Mac"
                                required
                                onChange={this.handleTitleChange}
                            /></td>
                </tr>
                <tr>
                    <td><label>
                                You Give:
                            {' '}
                                <Required />
                            </label></td>
                    <td><input
                                type='url'
                                name='image1'
                                id='image1'
                                placeholder='http://placekitten.com/200/300'
                                required
                                onChange={this.handleImage1Change}
                            /></td>
                </tr>
                <tr>
                    <td><label htmlFor='image2'>
                                You Get:
                            {' '}
                                <Required />
                            </label></td>
                    <td><input
                                type='url'
                                name='image2'
                                id='image2'
                                placeholder='http://placekitten.com/200/300'
                                required
                                onChange={this.handleImage2Change}
                            /></td>
                </tr>
                <tr>
                    <td align="center" colSpan="2"><Button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </Button>
                        {' '}
                        <Button type='submit' onClick={this.handleSubmit}>
                            Post Trade
                        </Button></td>
                </tr>
            </table>
            </form>
            </>
        );
    };
}