import React, {Component} from 'react'

import { connect } from 'react-redux'

class Counter extends Component {

    render() {

        return (
            <div>
            <h1>This is the counter</h1>
            {this.props.count}
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
    
}

export default connect ( mapStateToProps, actionBuilder ) ( Counter )