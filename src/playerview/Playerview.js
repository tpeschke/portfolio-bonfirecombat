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
        this.socket.on(`${battle}-health`, data => {
            if (data.id) {
                var healthfighter = this.state.fighterList.map(val => {
                    if (val.id === data.id) {
                        val.health_percent = data.health_percent
                        return val
                    } else {
                        return val
                    }
                })
                this.setState({ fighterList: healthfighter })
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
        this.socket.on(`${battle}-weapon`, data => {
            let { weapon, id } = data
            let tempfighter = this.state.fighterList.map(v => {
                if (id === v.id) {
                    v.weapon = weapon
                }
                return v
            })
            this.setState({ fighterList: tempfighter })
        })
        this.socket.on(`${battle}-hide`, data => {
            let { id } = data
            let tempfighter = this.state.fighterList.map(v => {
                if (v.id == id) {
                    if (v.hidden === '1') {
                        v.hidden = '0'
                    } else {
                        v.hidden = '1'
                    }
                }
                return v
            })
            this.setState({ fighterList: tempfighter })
        })
    }

    render() {
        var playerList = this.state.fighterList.map(d => {

            let color = { background: d.colorcode }

            if (d.dead === '0' && d.hidden === '0') {
                let bloodDrop = <i className="fas fa-tint fresh"></i>
                    , woundCategory = 1;

                //Tired
                if (d.health_percent > 1 && d.health_percent < 25) {
                    woundCategory = 2
                    bloodDrop = <i className="fas fa-tint tired"></i>
                    //Hurt
                } else if (d.health_percent >= 25 && d.health_percent < 5) {
                    woundCategory = 3
                    bloodDrop = <i className="fas fa-tint hurt"></i>
                    //Bloodied
                } else if (d.health_percent >= 5 && d.health_percent < 75) {
                    woundCategory = 4
                    bloodDrop = <i className="fas fa-tint bloodied"></i>
                    //Wounded
                } else if (d.health_percent >= 75 && d.health_percent < 100) {
                    woundCategory = 5
                    bloodDrop = <i className="fas fa-tint wounded"></i>
                    //Bleeding Out
                } else if (d.health_percent >= 100) {
                    woundCategory = 6
                    bloodDrop = <i className="fas fa-tint bleeding-out"></i>
                }

                let nameStyle = `ListItem Name`

                if (woundCategory + Math.floor(d.stress / 10) >= d.broken && d.broken) {
                    nameStyle += " broken";
                } else if (woundCategory + Math.floor(d.stress / 10) >= d.panic && d.panic) {
                    nameStyle += " panic";
                }

                return (<div
                    className={d.topcheck === '1' ? 'List playertop playerList' : 'List playerList'}
                    key={d.id}>
                    <div className="playerItem">
                        <div className="color" style={color}></div>
                        <p className={nameStyle}>{d.namefighter}</p>
                    </div>
                    <div className="playerItem">
                        <p>{d.weapon}</p>
                        {bloodDrop}
                    </div>
                </div>)
            }
        })

        if (this.state.statusList) {
            var deadList = this.state.fighterList.map(d => {

                let color = { background: d.colorcode }

                if (d.dead === '1' && d.hidden === '0') {
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
