import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class SaveLock extends Component {

    lock = () => {
        console.log(this.props)
        if (!this.props.user) {
            return <div
                className='navItem navLock'>
                <p id='navItem'>Saved Fields</p></div>
        } else {
            return <Link to='/SavedFields'
                style={{ textDecoration: 'none' }}>

                <div
                    className={this.props.page === "/SavedFields" ? 'navItem Current' : 'navItem'}>
                    <p id='navItem'>SavedFields</p>
                </div>

            </Link>
        }
    }

    render() {

        return (
            <div>
                {this.lock()}
            </div>
        )
    }
}