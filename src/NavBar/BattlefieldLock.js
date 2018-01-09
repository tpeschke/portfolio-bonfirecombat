import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class BattleLock extends Component {

    lock = () => {
        if (this.props.id === 0) {
           return  <div 
                    className='navItem navLock'>
                        Battle Field</div>
        } else {
            return <Link to='/BattleField'
            style={{ textDecoration: 'none' }}>
            
            <div 
            className={this.props.page==="/BattleField"?'navItemCurrent':'navItem'}>
            Battle Field
            </div>
            
            </Link>
        }
    }

    render() {

        var {page} = this.props

        return (
            <div>
                {this.lock()}
            </div>
        )
    }
}