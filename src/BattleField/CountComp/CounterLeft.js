import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

export default class CounterLeft extends Component {

    render() {

        var {user} = this.props

        if (user.data && user.data.tooltip === '1') {
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
    
                    <ReactTooltip place="bottom" delayShow='2000' />
                </div>
            )
        } else {
            return (
                <div>
                    <div className="counterSide">
                        <button className="counterButton"
                            onClick={this.props.RESETCOUNT}
                        >0</button>
                        <button className="counterButton"
                            onClick={this.props.stopTime}
                        >X</button>
                        <button className="counterButton"
                            onClick={this.props.DECREASECOUNT}
                        >-</button>
                    </div>

                </div>
            )
        }
    }
}