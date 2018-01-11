import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

export default class CounterRight extends Component {

    render() {


        return (
            <div>
                <div className="counterSide">
                    <button className="counterButton"
                        onClick={this.props.INCREASECOUNT}
                        data-tip="+1 Count"
                        >+</button>
                    <button className="counterButton"
                        onClick={this.props.autoTimer1}
                        data-tip="+1 Count/1 Sec"
                        >></button>
                    <button className="counterButton"
                        onClick={this.props.autoTimer2}
                        data-tip="+1 Count/.5 Sec"
                        >>></button>
                </div>

                <ReactTooltip 
                    place="bottom"
                    delayShow='2000'/>

            </div>
        )
    }
}