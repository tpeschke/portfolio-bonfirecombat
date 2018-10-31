import React from 'react'

export default function TurnedOff(props) {
    let {combatName} = props
    return (
        <div className="playerBody" id='playerBodyLocked'>
            <h2 className="topLock" id='viewLock'>{combatName}</h2>
            <h1 id='viewLock'>Your GM has currently turned off the view on this field</h1>
        </div>
    )
}