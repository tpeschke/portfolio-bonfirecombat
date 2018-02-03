import React, { Component } from 'react'

export default class StatusContainer extends Component {
    constructor() {
        super()

        this.state = {
            open: false
        }
    }

    openStatus = () => {
        this.setState({ open: !this.state.open })
    }

    render() {

        if (this.props.list) {
            var statusList = this.props.list.map((d, i) => {
                if(+d.timestatus - +this.props.count >= 0) {
                    return <div
                    className='StatusListOuter'
                    key={d.id}>
                    <div className="playerListItem">{d.namestatus}</div>
                    <p className="playerListItem">{+d.timestatus - +this.state.count}</p>
                </div>
                }
            })
        }


        return (
            <div className="statusOuter">
                <div className={this.state.open ? "statusList openList" : "statusList"}>
                    {statusList}</div>
                <div className={this.state.open ? "statusDiv openStatus" : "statusDiv"}>
                    <button
                        className='statusButton'
                        onClick={this.openStatus}
                    ></button>
                </div>
            </div>
        )
    }
}