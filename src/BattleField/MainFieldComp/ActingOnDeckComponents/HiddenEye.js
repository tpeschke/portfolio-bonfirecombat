import React from 'react'

export default function HiddenEye({ on, hide, id, toggleHide }) {
    if (on === "1") {
        return (<button className="hiddenShell"
            onClick={_ => {
                hide(id)
                toggleHide(id)
                }}>
            <p className="hiddenEye">)</p>
        </button>)
    }
    return (<button className="hiddenShell"
        onClick={_ => {
            hide(id)
            toggleHide(id)
            }}>
        <div className="openEye">
            <p className="hiddenEye1">(</p>
            <p className="hiddenEye2">o</p>
            <p className="hiddenEye3">)</p>
        </div>
    </button>)
}