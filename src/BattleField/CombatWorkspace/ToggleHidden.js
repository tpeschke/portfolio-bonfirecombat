import React from 'react'

export default function HiddenEye({ on, hide }) {
    if (on === "1") {
        return (<button className="hiddenShell addNewHidden"
            onClick={_ => {
                hide()
                }}>
            <p className="hiddenEye">)</p>
        </button>)
    }
    return (<button className="hiddenShell addNewHidden"
        onClick={_ => {
            hide()
            }}>
        <div className="openEye">
            <p className="hiddenEye1">(</p>
            <p className="hiddenEye2">o</p>
            <p className="hiddenEye3">)</p>
        </div>
    </button>)
}