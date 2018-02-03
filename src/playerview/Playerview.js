import React, { Component } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import { connect } from 'react-redux'

import socketFun from './SocketApi'
import './playerview.css'

const socket = io(process.env.PORT)

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

        this.socket = io('/')
        this.socket.on(`${battle}`, data => {
            this.setState({ view: data.playerview })
        })
        this.socket.on(`${battle}-count`, data => {
            this.setState({ count: data.count})
        })
        this.socket.on(`${battle}-top`, data => {
            console.log(data.id)
            var topfighter = this.state.fighterList.map(val => {
                console.log(val.id)
                if (val.id === data.id) {
                    console.log('fighter')
                    val.topcheck = '1'
                    return val
                } else {
                    console.log('not fighter')
                    return val
                }})
            this.setState({ fighterList: topfighter})
        }) 
        
        if (this.state.combatName == 'Battleplaceholder') {
            axios.get('/api/player/battle/' + battle).then((req, res) => {
                this.setState({combatName: req.data[0].namecombat})
            })}
            
            axios.get(`/api/player/fighter/${battle}`).then((req, res) => {
                this.setState({fighterList: req.data[0], statusList: req.data[1]})
            })
        }

    componentWillUpdate() {
        var { battle } = this.props.match.params
        
        this.socket.on(`${battle}-count`, data => {
            this.setState({ count: data.count})
        })
        this.socket.on(`${battle}-top`, data => {
            console.log(data.id)
            var topfighter = this.state.fighterList.map(val => {
                console.log(val.id)
                if (val.id === data.id) {
                    console.log('fighter')
                    val.topcheck = '1'
                    return val
                } else {
                    console.log('not fighter')
                    return val
                }})
            this.setState({ fighterList: topfighter})
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
                    <h1>Player view</h1>
                    <p>{this.state.combatName}</p>
                    <p>{this.state.count}</p>
                    <p>The Quick</p>
                    {playerList}
                    <p>The Dead</p>
                    {deadList}
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
