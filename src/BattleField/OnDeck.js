import React, { Component } from 'react'

export default class OnDeck extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            onDeck: props.onDeck
        }
    }

    render() {

        var { onDeck } = this.state

        if ( onDeck ) {
            var deckList = onDeck.map((d,i) => {

                return <div key={i + 'onDeck'}>

                        <p>{d.namefighter}</p>

                        <p>{d.speed}</p>

                        <p>{d.actioncount}</p>

                        </div>
            })
        }

        return (
            <div>
                <h1>this is on deck</h1>
                {deckList}
            </div>
        )
    }
}