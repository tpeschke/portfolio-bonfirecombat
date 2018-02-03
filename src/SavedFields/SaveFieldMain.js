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
        axios.get(`/api/combats/${this.props.user.id}`).then((req, res) => {
            this.setState({ combats: req.data })
        })
        this.props.PAGELOCATION('/SavedFields')
        this.props.setHeight((72+document.getElementById('Saved').clientHeight) + 'px')
    }

    componentDidUpdate(){
        this.props.setHeight((72+document.getElementById('Saved').clientHeight) + 'px');
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

        if (combats === []){
            var combatList = <div className='savedFieldDisplay' id='loading'>Loading Combats</div>
        } else if (combats === '') {
            combatList = <div className='savedFieldDisplay'>No Combats to Display</div>
        } else {
            combatList = combats.map((d, i) => {

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
                    <p className="savedItem">{d.deadnum ? d.deadnum : 0}</p>
                    <button className="savedItem"
                        onClick={_ => this.deleteFieldCheck(d.id)}
                    >X</button>
                </div>
            })
        }

        return (
            <div className="SavedField fadeInApp" id="Saved">
                <h1 className="fontHeader">Saved Fields</h1>

                <div className="savedMenu">
                    <Link to='/BattleField'>
                        <button onClick={_=>this.props.NEWFIELD(this.props.user.data.id)}>New Field</button>
                    </Link>
                </div>

                <div className="savedList">
                    <div className="savedListHeader">
                        <p className="savedItemName listHeader">Combat Name</p>
                        <p className="savedItem"></p>
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
    var {combatId, user} = state
    return {
        combatId,
        user
    }
}

let actionBuilders = {
    GETCOMBATFIGHTERS,
    NEWFIELD,
    PAGELOCATION
}

export default connect(mapStateToProps, actionBuilders)( SaveFieldMain)