import React, { Component } from 'react'

import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'

import { DELETESTATUSES } from '../../ducks/CompReducers/StatusReducer'
import socketFun from '../../playerview/SocketApi'

import './Statuses.css'

class Statuses extends Component {
    handleDelete = (id) => {
        this.props.DELETESTATUSES(id)
        socketFun.playerDelStatus({ id: id, hash: this.props.hash})
    } 

    render() {

        if (this.props.statusList) {
            var statuses = this.props.statusList.map((d, i) => {
                
                if (d.timestatus - this.props.count > 0) {
                    return <button key={d.id}
                        className="StatusItemBox"
                        onClick={_=>this.handleDelete(d.id)}>
                        <h5 className="StatusItem">{d.namestatus}</h5>
                        <div className={`${this.props.theme}-border`}></div>
                        <h6 className="StatusItemCount">{+d.timestatus - +this.props.count}</h6>
                    </button>
                }
            })
        }

        return (
            <div className="StatusList">
                <FlipMove>
                    {statuses}
                </FlipMove>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { statusList, count, hash, theme } = state

    return {
        statusList,
        count,
        hash,
        theme
    }
}

export default connect(mapStateToProps, { DELETESTATUSES })(Statuses)