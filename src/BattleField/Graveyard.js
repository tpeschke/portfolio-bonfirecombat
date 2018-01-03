import React, { Component } from 'react'

export default class Graveyard extends Component {
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
            var graveList = this.state.list.map((d, i) => {

                if (d.dead === '1') {

                    return <div className={i%2===0?'ListGrave':"ListGrave odd"}
                        key={d.namefighter + i + 'acting'}>

                        <p className="ListItemGrave">{d.namefighter}</p>

                        <button className="ListItemGrave">\o/</button>

                        <button className="ListItemGrave">X</button>

                    </div>
                }
            })
        }

        return (
            <div className="Main">
                <h1>the Dead</h1>
                <div className="HeaderGrave">
                    <h1 className="ListItemGrave">Name</h1>
                    <h1 className="ListItemGrave">Resurrect</h1>
                    <h1 className="ListItemGrave">Remove</h1>
                </div>
                {graveList}
            </div>
        )
    }
}