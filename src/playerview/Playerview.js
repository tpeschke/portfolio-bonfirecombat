import React, { Component } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import { connect } from 'react-redux'

import socketFun from './SocketApi'
import './playerview.css'

// import getBattle from '../playerview/SocketApi'

const socket = io(process.env.PORT)

export default class PlayerView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 'none yet',
            combatName: "Battleplaceholder",
            statusList: [],
            fighterList: [],
            view: false
        }
    }

    componentDidMount() {
        var { battle } = this.props.match.params

        this.socket = io('/')
        this.socket.on(`${battle}`, data => {
            this.updateDisplay(data)
        })
        if (this.state.combatName == 'Battleplaceholder') {
        axios.get('/api/player/battle/' + battle).then((req, res) => {
            this.setState({combatName: req.data[0].namecombat})
        })}
    }

    updateDisplay = (data) => {
        this.setState({ count: data.count, view: data.playerview })
    }

    render() {
        if (this.state.fighterList) {
            var playerList = this.state.fighterList.map((d, i) => {

                let color = { background: d.colorcode }

                if (d.dead === '0') {
                    return <div
                    className={d.topcheck === '1' ? 'List top' : 'List'}
                    key={d.id}>
                    <p className="ListItem Name">{d.namefighter}</p>
                    <p className="ListItem Name">{d.actioncount}</p>
                    </div>
                }
            })
        }

        if (this.state.view) {
            return (
                <div className="playerBody">
                    <h1>Player view</h1>
                    <p>{this.state.combatName}</p>
                    <p>{this.state.count}</p>

                    {playerList}
                </div>
            )
        } else {
            return (
                <div className="playerBody">
                    {this.state.combatName}
                    Your GM has currently turned off the view on this field
                </div>
            )
        }
        
    }
}
