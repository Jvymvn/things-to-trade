import React, { Component } from 'react';

class TradeItem extends Component {
    render() {
        return (
            <div className="TradeItem">
                <div className="TradeItem__content">
                    <div className="TradeItem_title">{this.props.title}</div>
                    <div className="TradeItem_give">
                        <img src={this.props.image1} />
                    </div>
                    <div className="TradeItem_get">
                        <img src={this.props.image2} />
                    </div>
                </div>
            </div>
        )
    }
}
export default TradeItem;