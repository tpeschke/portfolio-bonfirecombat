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

        var { combatId, page, user, theme } = this.props
        
        // if (user.error) {
        //     this.props.redirect('/')
        // }
        
        return (
            <div className={`navBar ${theme}-nav`}>
                <div className="navBarInner">
                    <BattleLock
                        page={page}
                        id={combatId}
                        userId={user.data} 
                        theme={theme}
                        />

                    <SavedLock
                        page={page}
                        id={combatId}
                        userId={user.data} 
                        theme={theme}
                        />
                </div>
            
                 <LogDisplay 
                    userId={user.data}
                    theme={theme} 
                    />

            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, page, user, theme } = state

    return {
        combatId,
        page,
        user,
        theme
    }
}

export default connect(mapStateToProps, {getUserInfo})(NavBar)