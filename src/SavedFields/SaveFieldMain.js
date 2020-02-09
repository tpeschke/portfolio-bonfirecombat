import React, { Component } from 'react';

import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal/lib/css';

import { NEWFIELD, PAGELOCATION, CLOSESAVEDFIELDWARNING } from '../ducks/reducer'
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
        axios.get(`/api/combats`).then(req => {
            this.setState({ combats: req.data })
        })
        this.props.PAGELOCATION('/SavedFields')
        this.props.setHeight((72 + document.getElementById('Saved').clientHeight) + 'px')
    }

    componentDidUpdate() {
        this.props.setHeight((72 + document.getElementById('Saved').clientHeight) + 'px');
    }

    deleteFieldCheck = (id) => {
        this.setState({ holder: id })
        this.setState({ open: true })
    }

    deleteFieldTotal = (id) => {
        axios.delete(`/api/battle/${id}`).then(req => {
            this.setState({ combats: req.data })
        })
        this.props.GETCOMBATFIGHTERS(0, '', 0)
        this.defDelete()
    }

    defDelete = () => {
        this.setState({ open: false })
    }

    closeWarning = () => {
        if (this.props.savedFieldWarning) {
            setTimeout(_ => this.props.CLOSESAVEDFIELDWARNING(), 5000)
        }
    }

    render() {
        var { combats } = this.state

        if (!combats) {
            var combatList = <div className='savedFieldDisplay' id='loading'>Loading Combats</div>
        } else if (combats.length === 0) {
            combatList = <div className='savedFieldDisplay'>No Combats to Display</div>
        } else {
            combatList = combats.map((d, i) => {

                return <div
                    className="savedCombat"
                    key={d.namecombat + i}>

                    <div className={`savedItemName ${this.props.theme}-font`}  onClick={_ => this.props.GETCOMBATFIGHTERS(d.id, d.namecombat, d.countnum)}>
                        <Link to='/BattleField'>
                            <button>
                                {d.namecombat}
                            </button>
                        </Link>
                    </div>

                    <p className={`savedItem ${this.props.theme}-font`}>{d.countnum}</p>
                    <p className={`savedItem ${this.props.theme}-font`}>{d.fighternum}</p>
                    <p className={`savedItem ${this.props.theme}-font`}>{d.deadnum ? d.deadnum : 0}</p>
                    <button className={`savedItem ${this.props.theme}-font`}
                        onClick={_ => this.deleteFieldCheck(d.id)}
                    ><i className="fas fa-trash-alt"></i></button>
                </div>
            })
        }

        return (
            <div className="SavedField fadeInApp" id="Saved">
                <h1 className={`fontHeader ${this.props.theme}-fontHeader`}>Saved Fields</h1>

                <div className="savedMenu">
                    <button
                        className={`${this.props.theme}-button`}
                        onClick={_ => this.props.NEWFIELD(this.props.redirect, this.openWarning)}>New Field</button>
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
                    theme={this.props.theme} />

                <Modal open={this.props.savedFieldWarning} onClose={this.props.CLOSESAVEDFIELDWARNING} little
                    showCloseIcon={true}
                    classNames={{ modal: 'modalWarning' }}>
                    <div className="modalDeleteOuter">
                        {this.closeWarning()}
                        {this.props.warning}
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, user, theme, warning, savedFieldWarning } = state
    return {
        combatId,
        user,
        theme,
        warning,
        savedFieldWarning
    }
}

let actionBuilders = {
    GETCOMBATFIGHTERS,
    NEWFIELD,
    PAGELOCATION,
    CLOSESAVEDFIELDWARNING
}

export default connect(mapStateToProps, actionBuilders)(SaveFieldMain)