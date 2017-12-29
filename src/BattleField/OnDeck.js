import React, { Component } from 'react'

export default class OnDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: props.list
        }
    }
    render() {

        var { list } = this.state

        console.log(list)

        if ( list ) {
            console.log('hit')
    
            var deckList = list.map((d,i) => {

                if (d.acting === '0') {

                return <div key={d.namefighter + i + 'onDeck'}>

                        <p>{d.namefighter}</p>

                        <p>{d.speed}</p>

                        <p>{d.actioncount}</p>

                        </div>
                }
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