import React, { Component } from 'react';

import Keyboard from './settingComp/KeyboardLayout'
import TooltipSwitch from './settingComp/TooltipSwitch'

class Settings extends Component {

    render() {
        var { user, settings } = this.props

        return (
            <div className={settings ? 'settingBanner' : 'settingBanner closed'}>
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
        )
    }
}

export default Settings