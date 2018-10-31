import React from 'react'

export default function TurnedOn(props) {
    let {combatName, count, playerList, deadList, statusList} = props

    return (
        <div className="playerBody">
            <div className="playerHeader">
                <h2>{combatName}</h2>
                <p>Player view</p>
                <h3 id="playerCount">{count}</h3>
            </div>
            <div className="playerContent">
                <h2>The Quick</h2>
                <div className='border'></div>
                <div className="listDiv">{playerList}</div>

                <h2>The Dead</h2>
                <div className='border'></div>
                <div className="listDiv">{deadList}</div>
            </div>

            <div className="playerStatus">
                {statusList}
            </div>
        </div>
    )
}