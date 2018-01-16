import React, { Component } from 'react'
import './Home.css'

import SignIn from './SignIn'


export default class Home extends Component {

    componentDidMount() {
        this.props.setHeight((72 + document.getElementById('home').clientHeight) + 'px')
    }

    render() {
        return (
            <div className="outHome" id="home">
                {/* <div className="img"> */}
                    <div className=".inHome">
                        <SignIn />
                    {/* </div> */}
                </div>
            </div>
        )
    }
}