import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer'

import BattleLock from './BattlefieldLock'
import LogDisplay from './LoginComps/LogDisplay'
import SavedLock from './SavedfieldsLock'

import './NavBar.css'


class NavBar extends Component {

    componentDidMount() {
        this.props.getUserInfo()
    }

    render() {

        var { combatId, page, user } = this.props

        return (
            <div className="navBar">
                <div className="navBarInner">
                    <BattleLock
                        page={page}
                        id={combatId}
                        userId={user.data} 
                        />

                    <SavedLock
                        page={page}
                        id={combatId}
                        userId={user.data} 
                        />
                </div>

                <LogDisplay 
                    userId={user.data} 
                    />

            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, page, user } = state

    return {
        combatId,
        page,
        user
    }
}

export default connect(mapStateToProps, {getUserInfo})(NavBar)