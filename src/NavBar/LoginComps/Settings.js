import React, { Component } from 'react';

class Settings extends Component {

    render() {
        var { user, settings } = this.props

        return (
            <div
            className={settings ? 'settingBanner' : 'settingBanner closed'}
            >
                <div className='settingInnerBanner'>

                    <img src={user.data ? user.data.img : null}/>
                    <h6>Welcome, {user.data ? user.data.username: null}</h6>
                
                </div>
            </div>
        )
    }
}

export default Settings