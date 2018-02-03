import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import socketFun from '../../playerview/SocketApi'

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
        this.setState({ topId: id })
        this.props.top()
    }

    handleDeath = (id) => {
        this.props.kill(id)
        socketFun.playerKill({ id: id, hash: this.props.hash})
    }

    render() {

        if (this.state.list) {

            var deckList = this.state.list.map((d, i) => {

                if (d.acting === '0' && d.dead === '0') {

                    let color = { background: d.colorcode }
                    
                   socketFun.playerUnTop({id: d.id, hash: this.props.hash})

                    return <div className="List"
                        key={d.id}>
                        <div className="color" style={color}></div>

                        <p className="ListItem Name">{d.namefighter}</p>

                        <button className="ListItem"
                            onClick={_ => this.props.advance(d.id)}
                        >{d.speed}</button>

                        <input className="ListItem inputFinder" placeholder={d.actioncount}
                            onBlur={e => this.props.action(d.id, e.target.value)} />

                        <button className="ListItem"
                            onClick={_ => this.handleTop(d.id)}
                        >(ง'̀-'́)ง</button>

                        <button className="ListItem"
                            onClick={_ => this.handleDeath(d.id)}
                        >X</button>

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
                <div className="border sectionborder"></div>
                <div className="Header">
                    <p className="ListItem Name NameHeader listHeader">Name</p>
                    <p className="ListItem listHeader">Speed</p>
                    <p className="ListItem listHeader">Action</p>
                    <p className="ListItem listHeader">ToP</p>
                    <p className="ListItem listHeader">Kill</p>
                    <p className="ListItem listHeader">Edit</p>
                </div>
                <div className="border"></div>

                <FlipMove>
                    {deckList}
                </FlipMove>

                <DeckEditFighter
                    color={this.state.holdcolor}
                    name={this.state.holdname}
                    speed={this.state.holdspeed}
                    id={this.state.holdid} />

                <DeckToP
                    id={this.state.topId}
                    hash={this.props.hash} />
            </div>
        )
    }
}