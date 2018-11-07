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
        var { user, settings, theme } = this.props

        return (
            <div className={settings ? "settingsBackdrop" : 'settingsBackdrop dropClosed'} onClick={this.toggleSettings}>
                <div className={settings ? `settingBanner ${theme}-settingBanner` : `settingBanner ${theme}-settingBanner closed`} onClick={e=>e.stopPropagation()}>
                    <div className={`settingBannerMid ${theme}-settingsBannerMid`}>
                        <div className={`settingInnerBanner ${theme}-settingInnerBanner`}>
                            <div>
                                <img src={user.data ? user.data.img : null} className={`${theme}-img`} />
                                <h6 className={`${theme}-font`}>Welcome, {user.data ? user.data.username : null}</h6>
                            </div>

                            <div className="bannerBody">

                                <Keyboard 
                                    theme={theme}/>

                                <TooltipSwitch />

                            </div>
                            <a href={`${process.env.REACT_APP_LOGOUT}`}>
                                <button id="settingButton"
                                className={`${theme}-font`}
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