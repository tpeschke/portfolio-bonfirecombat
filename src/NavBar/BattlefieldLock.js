import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class BattleLock extends Component {

    lock = () => {
        if (this.props.id === 0 && !this.props.userId) {
            return <div
                className='navItem navLock navInVis'>
                <p id='navItem'>Battle Field</p></div>
        } else if (this.props.id === 0) {
            return <div
                className='navItem navLock'>
                <p id='navItem'>Battle Field</p></div>
        } else {
            return <Link to='/BattleField'
                style={{ textDecoration: 'none' }}>

                <div
                    className={this.props.page === "/BattleField" ? 'navItem Current' : 'navItem'}>
                    <p id='navItem'>Battle Field</p>
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