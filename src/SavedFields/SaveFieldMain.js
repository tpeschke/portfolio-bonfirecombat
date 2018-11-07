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
            combats: null,
            holder: 0,
            open: false
        }
    }

    componentDidMount() {
        axios.get(`/api/combats/${this.props.user.id}`).then(req => {
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

        if (!combats){
            var combatList = <div className='savedFieldDisplay' id='loading'>Loading Combats</div>
        } else if (combats.length === 0) {
            combatList = <div className='savedFieldDisplay'>No Combats to Display</div>
        } else {
            combatList = combats.map((d, i) => {

                return <div
                    className="savedCombat"
                    key={d.namecombat + i}>

                    <Link to='/BattleField'>
                        <button className={`savedItemName ${this.props.theme}-font`}
                            onClick={_ => this.props.GETCOMBATFIGHTERS(d.id, d.namecombat, d.countnum)}>
                            {d.namecombat}
                        </button>
                    </Link>

                    <p className={`savedItem ${this.props.theme}-font`}>{d.countnum}</p>
                    <p className={`savedItem ${this.props.theme}-font`}>{d.fighternum}</p>
                    <p className={`savedItem ${this.props.theme}-font`}>{d.deadnum ? d.deadnum : 0}</p>
                    <button className={`savedItem ${this.props.theme}-font`}
                        onClick={_ => this.deleteFieldCheck(d.id)}
                    >X</button>
                </div>
            })
        }

        return (
            <div className="SavedField fadeInApp" id="Saved">
                <h1 className={`fontHeader ${this.props.theme}-fontHeader`}>Saved Fields</h1>

                <div className="savedMenu">
                    <Link to='/BattleField'>
                        <button 
                            className={`${this.props.theme}-button`}
                            onClick={_=>this.props.NEWFIELD(this.props.user.data.id)}>New Field</button>
                    </Link>
                </div>

                <div className={`savedList ${this.props.theme}-savedList`}>
                    <div className={`savedListHeader ${this.props.theme}-savedListHeader`}>
                        <p className={`savedItemName listHeader ${this.props.theme}-listHeader`}>Combat Name</p>
                        <p className={`savedItem listHeader ${this.props.theme}-listHeader`}>Count</p>
                        <p className={`savedItem listHeader ${this.props.theme}-listHeader`}>Fighters</p>
                        <p className={`savedItem listHeader ${this.props.theme}-listHeader`}>Dead</p>
                        <p className={`savedItem listHeader ${this.props.theme}-listHeader`}>Delete</p>
                    </div>
                    <div className={`${this.props.theme}-border`}></div>

                    {combatList}

                    <div className={`${this.props.theme}-border savedborder`}></div>
                </div>

                <DeleteDoubleCheck 
                    id={this.state.holder}
                    open={this.state.open}
                    close={this.defDelete}
                    delete={this.deleteFieldTotal}
                    theme={this.props.theme}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var {combatId, user, theme} = state
    return {
        combatId,
        user,
        theme
    }
}

let actionBuilders = {
    GETCOMBATFIGHTERS,
    NEWFIELD,
    PAGELOCATION
}

export default connect(mapStateToProps, actionBuilders)( SaveFieldMain)