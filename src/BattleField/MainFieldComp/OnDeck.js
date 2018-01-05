import React, { Component } from 'react'

import DeckEditFighter from './ActingOnDeckComponents/DeckEditFighter'
import DeckToP from './ActingOnDeckComponents/DeckThresholdOfPain'

export default class OnDeck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            count: props.count,

            holdcolor: '',
            holdname: '',
            holdspeed: 0,
            holdid: 0,

            topId: 0
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ list: next.list })
    }

    modifyFighter = (d) => {
        this.setState({
            holdcolor: d.colorcode,
            holdname: d.namefighter,
            holdspeed: d.speed,
            holdid: d.id
        })

        this.props.modal()
    }

    handleTop = (id) => {
        this.setState( { topId: id })

        this.props.top()
    }

    render() {

        if (this.state.list) {

            var deckList = this.state.list.map((d, i) => {

                if (d.acting === '0' && d.dead === '0') {

                    let color = { background: d.colorcode }

                    return <div className="List"
                        key={d.id}>
                        <div className="color" style={color}></div>

                        <p className="ListItem Name">{d.namefighter}</p>

                        <button className="ListItem"
                            onClick={_ => this.props.advance(d.id)}
                        >{d.speed}</button>

                        <input className="ListItem" placeholder={d.actioncount}
                            onBlur={e => this.props.action(d.id, e.target.value)} />

                        <button className="ListItem"
                            onClick={_ => this.handleTop(d.id)}
                        >(ง'̀-'́)ง</button>

                        <button className="ListItem"
                            onClick={_ => this.props.kill(d.id)}
                        >x</button>

                        <button className="ListItem"
                            onClick={_ => this.modifyFighter(d)}
                        >---</button>

                    </div>
                }
            })
        }

        return (
            <div className="Main">
                <p>On Deck</p>
                <div className="Header">
                    <p className="ListItem Name NameHeader">Name</p>
                    <p className="ListItem">Speed</p>
                    <p className="ListItem">Action</p>
                    <p className="ListItem">ToP</p>
                    <p className="ListItem">Kill</p>
                    <p className="ListItem">Edit</p>
                </div>
                {deckList}

                <DeckEditFighter
                    color={this.state.holdcolor}
                    name={this.state.holdname}
                    speed={this.state.holdspeed}
                    id={this.state.holdid} />

                <DeckToP
                    id={this.state.topId} />
            </div>
        )
    }
}