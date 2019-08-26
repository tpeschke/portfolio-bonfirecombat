import React, { Component } from 'react';
import { connect } from 'react-redux'
import { OPENSETTINGS, SETTHEME } from '../../ducks/reducer'

import Keyboard from './settingComp/KeyboardLayout'
import TooltipSwitch from './settingComp/TooltipSwitch'
import ThemeChanger from './settingComp/ThemeChanger'

class Settings extends Component {

    toggleSettings = () => {
        this.props.OPENSETTINGS()
    }

    render() {
        var { user, settings, theme, SETTHEME } = this.props

        return (
            <div className={settings ? "settingsBackdrop" : 'settingsBackdrop dropClosed'} onClick={this.toggleSettings}>
                <div className={settings ? `settingBanner ${theme}-settingBanner` : `settingBanner ${theme}-settingBanner closed`} onClick={e => e.stopPropagation()}>
                    <div className={`settingBannerMid ${theme}-settingsBannerMid`}>
                        <div className={`settingInnerBanner ${theme}-settingInnerBanner`}>
                            <Keyboard
                                theme={theme} />

                            <TooltipSwitch />

                            <ThemeChanger
                                theme={theme}
                                setTheme={SETTHEME} />

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

function mapStateToProps(state) { return {} }

export default connect(mapStateToProps, { OPENSETTINGS, SETTHEME })(Settings)