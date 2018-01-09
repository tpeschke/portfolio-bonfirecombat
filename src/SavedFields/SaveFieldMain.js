import React, { Component } from 'react';

import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { NEWFIELD, PAGELOCATION } from '../ducks/reducer'
import { GETCOMBATFIGHTERS } from '../ducks/CompReducers/CombatantsReducer'

import DeleteDoubleCheck from './deleteDoubleCheck'

import './SavedField.css'

class SaveFieldMain extends Component {
    constructor() {
        super()

        this.state = {
            combats: '',
            holder: 0,
            open: false
        }
    }

    componentDidMount() {
        axios.get('/api/fighters').then((req, res) => {
            this.setState({ combats: req.data })
        })
        this.props.PAGELOCATION(this.props.match.url)
    }

    deleteFieldCheck = (id) => {
        this.setState({ holder: id})
        this.setState({ open: true})
    }

    deleteFieldTotal = (id) => {
        axios.delete(`/api/battle/${id}`).then(req => {
            this.setState({ combats: req.data })
        })
        this.props.GETCOMBATFIGHTERS(0, '', 0)
        this.defDelete()
    }

    defDelete = () => {
        this.setState({ open: false})
    }

    render() {

        var { combats } = this.state

        if (combats) {
            var combatList = combats.map((d, i) => {

                return <div
                    className="savedCombat"
                    key={d.namecombat + i}>

                    <Link to='/BattleField'>
                        <button className="savedItemName"
                            onClick={_ => this.props.GETCOMBATFIGHTERS(d.id, d.namecombat, d.countnum)}>
                            {d.namecombat}
                        </button>
                    </Link>

                    <p className="savedItem"></p>
                    <p className="savedItem">{d.countnum}</p>
                    <p className="savedItem">{d.fighternum}</p>
                    <p className="savedItem">{d.deadnum}</p>
                    <button className="savedItem"
                        onClick={_ => this.deleteFieldCheck(d.id)}
                    >X</button>
                </div>
            })
        }

        return (
            <div className="SavedField">
                <h1 className="fontHeader">Saved Fields</h1>

                <div className="savedMenu">
                    <Link to='/BattleField'>
                        <button onClick={this.props.NEWFIELD}>New Field</button>
                    </Link>
                </div>

                <div className="savedList">
                    <div className="savedListHeader">
                        <p className="savedItemName listHeader">Combat Name</p>
                        <p className="savedItem listHeader"></p>
                        <p className="savedItem listHeader">Count</p>
                        <p className="savedItem listHeader">Fighters</p>
                        <p className="savedItem listHeader">Dead</p>
                        <p className="savedItem listHeader">Delete</p>
                    </div>
                    <div className="border"></div>

                    {combatList}
                    <div className="border savedborder"></div>
                </div>

                <DeleteDoubleCheck 
                    id={this.state.holder}
                    open={this.state.open}
                    close={this.defDelete}
                    delete={this.deleteFieldTotal}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var {combatId} = state
    return {
        combatId
    }
}

let actionBuilders = {
    GETCOMBATFIGHTERS,
    NEWFIELD,
    PAGELOCATION
}

export default connect(mapStateToProps, actionBuilders)(SaveFieldMain)