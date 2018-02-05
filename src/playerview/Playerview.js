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
            view: false
        }
    }

    componentDidMount() {
        var { battle } = this.props.match.params
        var { view } = this.state

        if (this.state.combatName === 'Battleplaceholder') {
            axios.get('/api/player/battle/' + battle).then((req, res) => {
                this.setState({ combatName: req.data[0].namecombat, count: req.data[0].countnum })
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
        this.socket.on(`${battle}-addStatus`, data => {
            var tempArr = this.state.statusList
            tempArr.push(data.status)
            this.setState({ statusList : tempArr})
        })
        this.socket.on(`${battle}-delStatus`, data => {
            const index = this.state.statusList.findIndex(e=> e.id === data.id)
            var tempArr = this.state.statusList.slice()
            tempArr.splice(index, 1)
            this.setState({ statusList: tempArr })
        })
        this.socket.on(`${battle}-add`, data => {
            var tempArr = this.state.fighterList
            tempArr.push(data.fighter)
            this.setState({ fighterList: tempArr })
        })
        this.socket.on(`${battle}-remove`, data => {
            const index = this.state.fighterList.findIndex(e=> e.id === data.id)
            var tempArr = this.state.fighterList.slice()
            tempArr.splice(index, 1)
            this.setState({ fighterList: tempArr })
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

        if (this.state.statusList) {var deadList = this.state.fighterList.map((d, i) => {

            let color = { background: d.colorcode }

            if (d.dead === '1') {
                return <div
                    className='List'
                    key={d.id}>
                    <div className="color" style={color}></div>
                    <p className="ListItem Name">{d.namefighter}</p>
                </div>
            }
        })}
            
        }

        if (this.state.statusList) {
            var statusList = this.state.statusList.map((d, i) => {
                if (d.timestatus - this.state.count > 0) {
                    return <div
                        className='statusListInner'
                        key={d.id}>
                        <div className="">{d.namestatus}</div>
                        <p className="">{d.timestatus - this.state.count}</p>
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

                    <div className="playerStatus">
                        {statusList}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="playerBody">
                    <h2 className="topLock" id='viewLock'>{this.state.combatName}</h2>
                    <h1 id='viewLock'>Your GM has currently turned off the view on this field</h1>
                </div>
            )
        }

    }
}
