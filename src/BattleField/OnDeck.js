import React, { Component } from 'react'

export default class OnDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            count: props.count
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ list: next.list })
    }

    render() {

        if (this.state.list) {

            var deckList = this.state.list.map((d, i) => {

                if (d.acting === '0' && d.dead === '0') {

                    return <div className={i % 2 === 0 ? 'List' : "List odd"}
                        key={d.namefighter + i + 'onDeck'}>

                        <p className="ListItem Name">{d.namefighter}</p>

                        <p className="ListItem">{d.speed}</p>

                        <p className="ListItem">{d.actioncount}</p>

                        <button className="ListItem">x</button>

                    </div>
                }
            })
        }

        return (
            <div className="Main">
                <p>On Deck</p>
                <div className="Header">
                    <p className="ListItem Name">Name</p>
                    <p className="ListItem">Speed</p>
                    <p className="ListItem">Action</p>
                    <p className="ListItem">Kill</p>
                </div>
                {deckList}
            </div>
        )
    }
}