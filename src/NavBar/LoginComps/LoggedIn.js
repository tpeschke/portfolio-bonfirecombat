import React, { Component } from 'react';

export default class LoggedIn extends Component {

    render() {

        var {img, username} = this.props.user

        return (
            <div className='signIn'>
                Welcome, {username}
                <button>Settings</button>
            </div>
        )
    }
}