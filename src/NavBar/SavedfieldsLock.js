import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class SaveLock extends Component {

    lock = () => {
       
        if (!this.props.userId) {
            return <div
                className='navItem navLock navInVis'>
                <p id='navItem'></p></div>
        } else {
            return <Link to='/SavedFields'
                style={{ textDecoration: 'none' }}>

                <div
                    className={this.props.page === "/SavedFields" ? 'navItem Current' : 'navItem'}>
                    <p id='navItem'>Saved Fields</p>
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