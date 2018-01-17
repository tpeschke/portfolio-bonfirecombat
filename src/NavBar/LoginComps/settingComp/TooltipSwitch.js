import React, { Component } from 'react'

import { connect } from 'react-redux'
import { FLIPTOOLTIP } from '../../../ducks/reducer'

class TooltipSwitch extends Component {

    render() {

        var { user } = this.props

        return (
            <div className="outTooltip">
                <div 
                    className={user.data && user.data.tooltip === '1' ? "switchOuter" : "switchOuter OuterOff"}
                    onClick={_ => this.props.FLIPTOOLTIP()}>
                    <div className={user.data && user.data.tooltip === '1' ? "switch" : "switch off"}></div>
                </div>
                <h7>Counter Tool-tips</h7>
            </div>
        
        )
    }
}

function mapStateToProps(state) {
    var { user } = state
    return {
        user
    }
}

let actionBuilders = {
    FLIPTOOLTIP
}

export default connect(mapStateToProps, actionBuilders)( TooltipSwitch )