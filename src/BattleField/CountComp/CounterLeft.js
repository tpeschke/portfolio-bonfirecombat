import React, { Component } from 'react'


export default class CounterLeft extends Component {
    constructor() {
        super()

        this.state = {
            vis: 0
        }
    }

    fadeIn = (num) => {
        setTimeout(_ => {
            this.setState({ vis: num })
        }, 2000)
    }
    render() {
        return (
            <div>
                <div className="counterSide">
                    <button className="counterButton"
                        onClick={this.props.RESETCOUNT}
                        onMouseOver={_ => this.fadeIn('1')}
                        onMouseLeave={_ => this.setState({ vis: 0 })}
                    >0</button>
                    <button className="counterButton"
                        onClick={this.props.stopTime}
                        onMouseOver={_ => this.fadeIn('2')}
                        onMouseLeave={_ => this.setState({ vis: 0 })}
                    >X</button>
                    <button className="counterButton"
                        onClick={this.props.DECREASECOUNT}
                        onMouseOver={_ => this.fadeIn('3')}
                        onMouseLeave={_ => this.setState({ vis: 0 })}
                    >-</button>
                </div>

                <div className="tooltipBin">
                    <div
                        className={this.state.vis === '1' ? "tooltip visible" : "tooltip"}
                    >(-1 Count)</div>
                    <div
                        className={this.state.vis === '2' ? "tooltip visible" : "tooltip"}
                    >(Stop AutoCount)</div>
                    <div
                        className={this.state.vis === '3' ? "tooltip visible" : "tooltip"}
                    >(Reset Count)</div>
                </div>
            </div>
        )
    }
}