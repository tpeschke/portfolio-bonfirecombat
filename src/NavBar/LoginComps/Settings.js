import React, { Component } from 'react';
import { connect } from 'react-redux'
import {OPENSETTINGS} from '../../ducks/reducer'

import Keyboard from './settingComp/KeyboardLayout'
import TooltipSwitch from './settingComp/TooltipSwitch'

class Settings extends Component {

    toggleSettings = () => {
        this.props.OPENSETTINGS()
    }

    render() {
        var { user, settings } = this.props

        return (
            <div className={settings ? "settingsBackdrop" : 'settingsBackdrop dropClosed'} onClick={this.toggleSettings}>
                <div className={settings ? 'settingBanner' : 'settingBanner closed'} onClick={e=>e.stopPropagation()}>
                    <div className="settingBannerMid">
                        <div className='settingInnerBanner'>
                            <div>
                                <img src={user.data ? user.data.img : null} />
                                <h6>Welcome, {user.data ? user.data.username : null}</h6>
                            </div>

                            <div className="bannerBody">

                                <Keyboard />

                                <TooltipSwitch />

                            </div>
                            <a href={`${process.env.REACT_APP_LOGOUT}`}>
                                <button id="settingButton"
                                    onClick={_ => this.props.playerview ? this.props.TOGGLEPLAYERVIEW() : null}
                                >Log Out</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) { return {} }

export default connect(mapStateToProps, {OPENSETTINGS})(Settings)