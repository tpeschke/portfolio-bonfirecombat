import React, { Component } from 'react'

export default class Acting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            count: props.count
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ list: next.list })
    }

    render() {

        if (this.state.list) {
            var actingList = this.state.list.map((d, i) => {

                if (d.acting === '1' && d.dead === '0') {

                    return <div className={i%2===0?'List':"List odd"}
                        key={d.namefighter + i + 'acting'}>

                        <p className="ListItem Name">{d.namefighter}</p>

                        <p className="ListItem">{d.speed}</p>

                        <p className="ListItem">{d.actioncount}</p>

                        <button className="ListItem">x</button>

                    </div>
                }
            })
        }

        return (
            <div className="Main">
                <p>Acting</p>
                <div className="Header">
                    <p className="ListItem Name">Name</p>
                    <p className="ListItem">Speed</p>
                    <p className="ListItem">Action</p>
                    <p className="ListItem">Kill</p>
                </div>
                {actingList}
            </div>
        )
    }
}