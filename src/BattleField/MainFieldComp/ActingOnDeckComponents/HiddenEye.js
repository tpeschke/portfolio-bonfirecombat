import React from 'react'

export default function HiddenEye({ on, hide, id, toggleHide }) {
    if (on === "1") {
        return (<button className="hiddenShell"
            onClick={_ => {
                hide(id)
                toggleHide(id)
                }}>
            <i className="fas fa-eye-slash openEye"></i>
        </button>)
    }
    return (<button className="hiddenShell"
        onClick={_ => {
            hide(id)
            toggleHide(id)
            }}>
        <i className="fas fa-eye openEye"></i>
    </button>)
}