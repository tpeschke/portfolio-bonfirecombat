import React, { Component } from 'react'


export default class PlayerNoBattle extends Component {

    render() {
        return (
            <div className="playerBody" id="playerViewMain">
                <h2 className="playerHeader">Welcome to the Player View</h2>

                <p>You're GM will give you a 5 character hash</p>
                <p id="playerViewSubtitle">(This hash is case sensitive)</p>
                <p>Plug it into your URL like so:</p>

                <div className="hashUrl" id="playerViewInput">
                    <div className="innerHashUrl">
                        <p className="hashUrlText" id="hashBaseUrl">combatcounter.highadventuregames.net/player/</p>
                        <p className="hashUrlText" id="hashBattleUrl">HASH</p>
                    </div>
                </div>

                <p>You may only see the battle name pop up</p>
                <p>If that's the case, simply wait for your GM to turn on the view</p>
            </div>
        )
    }
}
