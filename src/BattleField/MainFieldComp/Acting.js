import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import ActEditFighter from './ActingOnDeckComponents/ActEditFighter'
import ActToP from './ActingOnDeckComponents/ActThresholdOfPain'

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
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ list: next.list })
        // this.state.list.forEach( child => {
        //     const ref = this.refs[+child.id];
        //     const domNode = ReactDOM.findDOMNode( ref );
        //     const boundingBox = domNode.getBoundingClientRect();

        //     this.setState({
        //         [+child.id]: boundingBox
        //     })
        // })

    }

    // componentDidUpdate(prev) {
    //     prev.list.forEach( child => {
    //         let domNode = ReactDOM.findDOMNode( this.ref[child.id])
            
    //         const newBox = domNode.getBoundingClientRect();
    //         const oldBox = this.state[child.id];

    //         const deltaX = oldBox.left - newBox.left;
    //         const deltaY = oldBox.top - newBox.top;

    //         requestAnimationFrame( _ => {
    //             domNode.style.transform = `translate(${deltaX},${deltaY}px)`;
    //             domNode.style.transition = 'transform 0s';

    //             requestAnimationFrame( _ => {
    //                 domNode.style.transform = '';
    //                 domNode.style.transition = 'transform 500ms'
    //             })
    //         })
    //     })
    // }

    modifyFighter = (d) => {
        this.setState({
            holdcolor: d.colorcode,
            holdname: d.namefighter,
            holdspeed: d.speed,
            holdid: d.id
        })

        this.props.modal2()
    }

    handleTop = (id) => {
        this.setState( { holdid: id} )
        
        this.props.top2()
    }

    render() {

        if (this.state.list) {
            var actingList = this.state.list.map((d, i) => {

                if (d.acting === '1' && d.dead === '0') {

                    let color = { background: d.colorcode }

                    return <div 
                        className={d.topcheck === '1' ? 'List top' : 'List'}
                        key={d.id}>
                        <div className="color" style={color}></div>

                        <p className="ListItem Name">{d.namefighter}</p>

                        <button className="ListItem"
                            onClick={_ => this.props.advance(d.id)}
                        >{d.speed}</button>

                        <input className="ListItem inputFinder" placeholder={d.actioncount}
                            onBlur={e => this.props.action(d.id, e.target.value)} />

                        <button className="ListItem"
                            onClick={_ => this.handleTop(d.id)}
                        >(ง'̀-'́)ง</button>

                        <button className="ListItem"
                            onClick={_ => this.props.kill(d.id)}
                        >X</button>

                        <button className="ListItem"
                            onClick={_ => this.modifyFighter(d)}
                        >---</button>

                    </div>
                }
            })
        }

        return (
            <div className="Main">
                <p>Acting</p>
                <div className="border sectionborder"></div>
                <div className="Header">
                    <p className="ListItem Name NameHeader listHeader">Name</p>
                    <p className="ListItem listHeader">Speed</p>
                    <p className="ListItem listHeader">Action</p>
                    <p className="ListItem listHeader">ToP</p>
                    <p className="ListItem listHeader">Kill</p>
                    <p className="ListItem listHeader">Edit</p>
                </div>
                <div className="border"></div>
                {actingList}
                <div className="border"></div>

                <ActEditFighter
                    color={this.state.holdcolor}
                    name={this.state.holdname}
                    speed={this.state.holdspeed}
                    id={this.state.holdid} />

                <ActToP 
                    id={this.state.holdid}/>
            </div>
        )
    }
}