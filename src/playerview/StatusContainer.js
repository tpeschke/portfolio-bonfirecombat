import React, { Component } from 'react'

export default class StatusContainer extends Component {

    render() {

        if (this.props.list) {
            var statusList = this.props.list.map((d, i) => {
                if(d.timestatus - this.props.count >= 0) {
                    return <div
                    className='StatusList' key={d.id}>
                    <div className="playerListItem">{d.namestatus}</div>
                    <p className="playerListItem">{+d.timestatus - +this.props.count}</p>
                </div>
                }
            })
        } else { statusList = <div className='StatusList'></div>}
        
        return <div> {statusList} </div>
        
    }
}