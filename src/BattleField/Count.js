import React, {Component} from 'react'

import { connect } from 'react-redux'

import { INCREASECOUNT } from '../ducks/counterRed/counterReducer'

class Counter extends Component {

    render() {

        return (
            <div>
            <h1>This is the counter</h1>
            {this.props.count}
            <button onClick={this.props.INCREASECOUNT}>+</button>
            </div>
        )
    }
}

function mapStateToProps ( state ) {
    
    var { count } = state
    
    return {
        count
    }
}

let actionBuilder = {
    INCREASECOUNT
}

export default connect ( mapStateToProps, actionBuilder ) ( Counter )