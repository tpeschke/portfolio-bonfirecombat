import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import BatteLock from './BattlefieldLock'
import SignIn from './SignIn'

import './NavBar.css'


class NavBar extends Component {

    render() {

        var { combatId, page } = this.props

        return (

                <div className="navBar">
                    <div className="navBarInner">
                    <BatteLock
                        page={page}
                        id={combatId} />

                    <Link to='/'
                        style={{ textDecoration: 'none' }}>

                        <div
                            className={this.props.page === "/" ? 'navItem Current' : 'navItem'}>
                            <p id='navItem'>Saved Fields</p>
                            </div>

                    </Link>
                    </div>
                    <SignIn />
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