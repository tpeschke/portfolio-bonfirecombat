import React, { Component } from 'react'

import LoggedIn from './LoggedIn'

class LogDisplay extends Component {


    render() {
            return (
                <div>
                    <LoggedIn 
                        user={this.props.user.data}/>
                </div>
            )
    }
}

