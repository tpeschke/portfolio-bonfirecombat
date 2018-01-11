import React, { Component } from 'react'


export default class CounterMiddle extends Component {
    render() {
        return (
            <div className="counterMiddle">
                <h3>the Count</h3>
                <div className="border countborder"></div>
                <h3 className="countNum">{this.props.count}</h3>
            </div>
        )
    }
}