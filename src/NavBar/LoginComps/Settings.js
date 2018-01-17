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
                        <div>
                            <h7>Keyboard Shortcuts</h7>
                            <Keyboard />
                        </div>
                        <div>
                            <TooltipSwitch />
                        </div>
                        <a href='http://localhost:5678/auth/logout'><button>Log Out</button></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings