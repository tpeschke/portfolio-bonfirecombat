import React, { Component } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import { connect } from 'react-redux'

import playerBattle from './SocketApi'
import './playerview.css'

const socket = io(process.env.PORT)

export default class PlayerView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            fighterList: [],
            statusList: [],
            combatName: ''
        }
    }

    componentWillMount() {
        socket.on('playerInfo', info => {
            this.updateState(info)
        })
    }

    componentDidUpdate() {
        socket.on('playerInfo', info => {
            this.updateState(info)
        })
    }

    updateState = (battle) => {
        var {count, fighterList, statusList, combatName } = battle
        this.setState({ count: count, fighterList: fighterList, statusList: statusList, combatName: combatName  })
    }

    render() {
        return (
            <div className="playerBody">
                <h1>Player view</h1>
                <p>{this.state.count}</p>
            </div>
        )
    }
}
