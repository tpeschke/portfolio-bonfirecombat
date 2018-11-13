import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import socketFun from '../../playerview/SocketApi'

import ActEditFighter from './ActingOnDeckComponents/ActEditFighter'
import ActToP from './ActingOnDeckComponents/ActThresholdOfPain'
import ActWeapon from './ActingOnDeckComponents/ActWeapon'
import HiddenEye from './ActingOnDeckComponents/HiddenEye'
import {checkNum} from '../../components/validation'

export default class Acting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            count: props.count,
            hold: '',

            holdcolor: '',
            holdname: '',
            holdspeed: 0,
            holdid: 0,
            holdweapons: [],
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
        }, _ => this.props.modal2())
    }

    chooseWeapon = (id, weapons) => {
        this.setState({ holdid: id, holdweapons: weapons })
        this.props.weaponModal2()
    }

    handleTop = (id) => {
        this.setState({ holdid: id })
        this.props.top2()
    }

    handleDeath = (id) => {
        this.props.kill(id)
        socketFun.playerKill({ id: id, hash: this.props.hash })
    }

    handleHide = (id) => {
        socketFun.playerHide({ id: id, hash: this.props.hash })
    }

    render() {
        let {theme} = this.props

        if (this.state.list) {

            var actingList = this.state.list.map((d, i) => {

                if (d.acting === '1' && d.dead === '0') {

                    let color = { background: d.colorcode }

                    let speed = +d.weapons.filter(val => val.selected == 1)[0].speed

                    let action = (<div className="actionLocked">
                        <div className={`ListItem ${theme}-font`}>
                            {speed}
                        </div>

                        <button className={`ListItem ${theme}-font actionDice`}
                            onClick={_ => this.props.rollInit(d.id, d.actioncount[0], d.actioncount[1])}
                        >1d{d.actioncount[0]}+{d.actioncount[1]}</button>
                    </div>)

                    if (!isNaN(d.actioncount)) {
                        action = (<div className="actionLocked">
                            <button className={`ListItem ${theme}-font`}
                                onClick={_ => this.props.advance(d.id, speed)}
                            >{speed}</button>

                            <input className={`ListItem ${theme}-input inputFinder`}
                                value={d.actioncount}
                                onChange={e => checkNum(e.target.value) ? this.props.action(d.id, +e.target.value, true) : null}
                                onBlur={e => checkNum(e.target.value) ? this.props.action(d.id, +e.target.value, false) : null} />
                        </div>)
                    }

                    return <div
                        className={d.hidden === '1' ? 'List hidden' : d.topcheck === '1' ? 'List top' : 'List'}
                        key={d.id}>

                        <HiddenEye 
                            on={d.hidden}
                            hide={this.props.hide}
                            id={d.id}
                            toggleHide={this.handleHide}/>

                        <div className="color" style={color}></div>

                        <p className={`ListItem ${theme}-font Name`}>{d.namefighter}</p>

                        <div className={`ListItem ${theme}-font`}
                            onClick={_ => this.chooseWeapon(d.id, d.weapons)}>
                            <div class="arrow right"></div>
                        </div>

                        {action}

                        <button className={`ListItem ${theme}-font`}
                            onClick={_ => this.handleTop(d.id)}
                        >(ง'̀-'́)ง</button>

                        <button className={`ListItem ${theme}-font`}
                            onClick={_ => this.handleDeath(d.id)}
                        >X</button>

                        <button className={`ListItem ${theme}-font`}
                            onClick={_ => this.modifyFighter(d)}
                        >---</button>

                    </div>
                }
            })
        }

        return (
            <div className="Main">
                <p>Acting</p>
                <div className={`${this.props.theme}-border sectionborder`}></div>
                <div className={`Header ${this.props.theme}-Header`}>
                    <p className={`ListItem ${theme}-font Name NameHeader listHeader`}>Name</p>
                    <p className={`ListItem ${theme}-font listHeader`}>Speed</p>
                    <p className={`ListItem ${theme}-font listHeader action`}>Action</p>
                    <p className={`ListItem ${theme}-font listHeader`}>ToP</p>
                    <p className={`ListItem ${theme}-font listHeader`}>Kill</p>
                    <p className={`ListItem ${theme}-font listHeader`}>Edit</p>
                </div>
                <div className={`${this.props.theme}-border`}></div>

                <FlipMove duration={750} easing="ease-out">
                    {actingList}
                </FlipMove>

                <div className={`${this.props.theme}-border`}></div>

                <ActEditFighter
                    color={this.state.holdcolor}
                    name={this.state.holdname}
                    speed={this.state.holdspeed}
                    id={this.state.holdid} />

                <ActWeapon
                    weapons={this.state.holdweapons}
                    id={this.state.holdid} />

                <ActToP
                    id={this.state.holdid}
                    hash={this.props.hash} />
            </div>
        )
    }
}