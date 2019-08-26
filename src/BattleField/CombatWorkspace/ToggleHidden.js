import React from 'react'

export default function HiddenEye({ on, hide }) {
    if (on === "1") {
        return (<button className="hiddenShell addNewHidden"
            onClick={_ => {
                hide()
                }}>
            <i className="fas fa-eye-slash openEye"></i>
        </button>)
    }
    return (<button className="hiddenShell addNewHidden"
        onClick={_ => {
            hide()
            }}>
        <i className="fas fa-eye openEye"></i>
    </button>)
}