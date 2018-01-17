import React, { Component } from 'react';


class Settings extends Component {

    render() {
        var { user, settings } = this.props

        return (
            <div className={settings ? 'settingBanner' : 'settingBanner closed'}>
                <div className="settingBannerMid">
                    <div className='settingInnerBanner'>

                        <img src={user.data ? user.data.img : null} />
                        <h6>Welcome, {user.data ? user.data.username : null}</h6>

                        <a href='http://localhost:5678/auth/logout'><button>Log Out</button></a>
                </div>
                </div>
            </div>
        )
    }
}

export default Settings