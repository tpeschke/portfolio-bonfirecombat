import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

export default class CounterLeft extends Component {

    render() {
        return (
            <div>
                <div className="counterSide">
                    <button className="counterButton"
                        onClick={this.props.RESETCOUNT}
                        data-tip="Reset Count"
                    >0</button>
                    <button className="counterButton"
                        onClick={this.props.stopTime}
                        data-tip="Stop AutoCount"
                    >X</button>
                    <button className="counterButton"
                        onClick={this.props.DECREASECOUNT}
                        data-tip="-1 Count"
                    >-</button>
                </div>

                <ReactTooltip
                    place="bottom"
                    delayShow='2000' />

            </div>
        )
    }
}