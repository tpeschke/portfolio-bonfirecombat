import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

import './Settings.css'

export default class Keyboard extends Component {

    render() {
        return (
            <div className="keyboard">
                <h7>Keyboard Shortcuts</h7>
                <div className="keyrow toprow">
                    <div className="key"
                        data-tip="+1 Count/1 Sec">
                        W
                </div>
                    <div className="key"
                        data-tip="+1 Count/.5 Sec">
                        E
                </div>
                </div>

                <div className="keyrow">
                    <div className="key"
                        data-tip="-1 Count">
                        A
                </div>
                    <div className="key"
                        data-tip="Stop AutoCount">
                        S
                </div>
                    <div className="key"
                        data-tip="+1 Count">
                        D
                </div>

                </div>
                <div className="keyrow topbottomrow">
                    <div className="key"
                        data-tip="Reset Count">
                        X
                </div>
                </div>

                <div className="keyrow bottombottomrow">
                    <div className="key space"
                        data-tip="+1 Count/1 Sec">

                    </div>
                </div>

                <ReactTooltip
                    place="right" />
            </div>
        )
    }
}