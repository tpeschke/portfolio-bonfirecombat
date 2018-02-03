import React, { Component } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import StatusContainer from './StatusContainer'

import './playerview.css'

export default class PlayerView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            combatName: "Battleplaceholder",
            statusList: [],
            fighterList: [],
            view: true
        }
    }

    componentDidMount() {
        var { battle } = this.props.match.params
        var { view } = this.state

        if (this.state.combatName === 'Battleplaceholder') {
            axios.get('/api/player/battle/' + battle).then((req, res) => {
                this.setState({ combatName: req.data[0].namecombat })
            })
        }

        axios.get(`/api/player/fighter/${battle}`).then((req, res) => {
            this.setState({ fighterList: req.data[0], statusList: req.data[1] })
        })

        this.socket = io('/')
        this.socket.on(`${battle}`, data => {
            if (view !== data.playerview) {
                this.setState({ view: data.playerview })
            }
        })
        this.socket.on(`${battle}-count`, data => {
            if (data.count) {
                this.setState({ count: data.count })
            }
        })
        this.socket.on(`${battle}-top`, data => {
            if (data.id) {
                var topfighter = this.state.fighterList.map(val => {
                    if (val.id === data.id) {
                        val.topcheck = '1'
                        return val
                    } else {
                        return val
                    }
                })
                this.setState({ fighterList: topfighter })
            }
        })
        this.socket.on(`${battle}-kill`, data => {
            if (data.id) {
                var topfighter = this.state.fighterList.map(val => {
                    if (val.id === data.id) {
                        val.dead = '1'
                        return val
                    } else {
                        return val
                    }
                })
                this.setState({ fighterList: topfighter })
            }
        })
        this.socket.on(`${battle}-untop`, data => {
            if (data.id) {
                var topfighter = this.state.fighterList.map(val => {
                    if (val.id === data.id) {
                        val.topcheck = '0'
                        return val
                    } else {
                        return val
                    }
                })
                this.setState({ fighterList: topfighter })
            }
        })
        this.socket.on(`${battle}-resurrect`, data => {
            if (data.id) {
                var topfighter = this.state.fighterList.map(val => {
                    if (val.id === data.id) {
                        val.dead = '0'
                        return val
                    } else {
                        return val
                    }
                })
                this.setState({ fighterList: topfighter })
            }
        })
    }

    render() {
        if (this.state.fighterList) {

            var playerList = this.state.fighterList.map((d, i) => {

                let color = { background: d.colorcode }

                if (d.dead === '0') {
                    return <div
                        className={d.topcheck === '1' ? 'List top' : 'List'}
                        key={d.id}>
                        <div className="color" style={color}></div>
                        <p className="ListItem Name">{d.namefighter}</p>
                    </div>
                }
            })

            var deadList = this.state.fighterList.map((d, i) => {

                let color = { background: d.colorcode }

                if (d.dead === '1') {
                    return <div
                        className='List'
                        key={d.id}>
                        <div className="color" style={color}></div>
                        <p className="ListItem Name">{d.namefighter}</p>
                    </div>
                }
            })
        }

        if (this.state.view) {
            return (
                <div className="playerBody">
                    <div className="playerHeader">
                        <h2>{this.state.combatName}</h2>
                        <p>Player view</p>
                        <h3 id="playerCount">{this.state.count}</h3>
                    </div>
                    <div className="playerContent">
                        <h2>The Quick</h2>
                        <div className='border'></div>
                        <div className="listDiv">{playerList}</div>

                        <h2>The Dead</h2>
                        <div className='border'></div>
                        <div className="listDiv">{deadList}</div>
                    </div>
                    <StatusContainer
                        list={this.state.statusList}
                        count={this.state.count} />

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
