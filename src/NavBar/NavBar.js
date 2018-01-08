import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import BatteLock from './BattlefieldLock'


class NavBar extends Component {

    render() {

        var { combatId, page } = this.props

        return (
            <div className="navBar">
                <BatteLock 
                    page={page}
                    id={combatId}/>

                <Link to='/'
                style={{ textDecoration: 'none' }}>
                
                <div 
                className={page==="/"?'navItemCurrent':'navItem'}>
                Saved Fields</div>
                
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, page } = state

    return {
        combatId,
        page
    }
}

export default connect(mapStateToProps, {})(NavBar)