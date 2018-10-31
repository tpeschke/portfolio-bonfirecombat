import React, { Component } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import './playerview.css'
import TurnedOff from './TurnedOff'
import TurnedOn from './TurnedOn'

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
            this.setState({ view: data.playerview })
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
            this.setState({ statusList: tempArr })
        })
        this.socket.on(`${battle}-delStatus`, data => {
            const index = this.state.statusList.findIndex(e => e.id === data.id)
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
            const index = this.state.fighterList.findIndex(e => e.id === data.id)
            var tempArr = this.state.fighterList.slice()
            tempArr.splice(index, 1)
            this.setState({ fighterList: tempArr })
        })
        this.socket.on(`${battle}-clear`, _ => {
            this.setState({ fighterList: [] })
        })
        this.socket.on(`${battle}-edit`, data => {
            const newList = this.state.fighterList.map(val => {
                if (val.id === data.fighter.id) {
                    val.namefighter = data.fighter.namefighter
                    val.colorcode = data.fighter.colorcode
                    val.speed = data.fighter.speed
                    return val
                } else {
                    return val
                }
            })
            this.setState({ fighterList: newList })
        })
    }

    render() {

        var playerList = this.state.fighterList.map(d => {

            let color = { background: d.colorcode }

            if (d.dead === '0') {
                return (<div
                    className={d.topcheck === '1' ? 'List playertop' : 'List'}
                    key={d.id}>
                    <div className="color" style={color}></div>
                    <p className="ListItem Name">{d.namefighter}</p>
                </div>)
            }
        })

        if (this.state.statusList) {
            var deadList = this.state.fighterList.map(d => {

                let color = { background: d.colorcode }

                if (d.dead === '1') {
                    return (<div
                        className='List'
                        key={d.id}>
                        <div className="color" style={color}></div>
                        <p className="ListItem Name">{d.namefighter}</p>
                    </div>)
                }
            })
        }

        if (this.state.statusList) {
            var statusList = this.state.statusList.map((d, i) => {
                if (d.timestatus - this.state.count > 0) {
                    return (<div
                        className='statusListInner'
                        key={d.id}>
                        <div className="">{d.namestatus}</div>
                        <p className="">{d.timestatus - this.state.count}</p>
                    </div>)
                }
            })
        }

        // ============================================================= \\

        if (!this.state.view) {
            return (
                <div>
                    <TurnedOff
                        combatName={this.state.combatName} />
                </div>
            )
        } else {
            return (
                <div>
                    <TurnedOn
                        combatName={this.state.combatName}
                        count={this.state.count}
                        playerList={playerList}
                        deadList={deadList}
                        statusList={statusList} />
                </div>
            )
        }
    }
}
