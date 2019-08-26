import React, { Component } from 'react'
import socketFun from '../../playerview/SocketApi'

export default class Graveyard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: false,
            count: props.count
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ list: next.list })
    }

    handleResurrect = (id) => {
        this.props.kill(id)
        socketFun.playerResurrect({id: id, hash: this.props.hash})
    }

    handleRemove = (id) => {
        this.props.remove(id)
        socketFun.playerRemove({id: id, hash: this.props.hash})
    }

    render() {
        var graveList = []

        let {theme} = this.props

        if (this.state.list) {
            graveList = this.state.list.map((d, i) => {

                if (d.dead === '1') {

                    return <div className="ListGrave"
                        key={d.namefighter + i + 'acting'}>

                        <p className="ListItemGrave GraveName gravelist">{d.namefighter}</p>

                        <button className="ListItemGrave gravelist"
                            onClick={_ => this.handleResurrect(d.id)}
                        >\(•◡•)/</button>

                        <button className="ListItemGrave gravelist"
                            onClick={_ => this.handleRemove(d.id)}
                        >X</button>

                    </div>
                }
            })
        }

        return (
            <div className={`BattleSidebar`}>
                <h2 className={`${theme}-h2`}>the Dead</h2>
                <div className="HeaderGrave">
                    <h1 className="ListItemGrave GraveName">Name</h1>
                    <h1 className="ListItemGrave">Resurrect</h1>
                    <h1 className="ListItemGrave">Remove</h1>
                </div>
                <div className={`${theme}-border graveborder`}></div>
                {graveList}
                <div className={`${theme}-border graveborder`}></div>
            </div>
        )
    }
}