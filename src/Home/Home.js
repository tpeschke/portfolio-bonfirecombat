import React, { Component } from 'react'
import './Home.css'

import SignIn from './SignIn'
import FeatureList from './FeatureList'


export default class Home extends Component {


    componentDidMount() {
        this.props.setHeight((70 + document.getElementById('home').clientHeight) + 'px')
    }

    
    render() {
        return (
            <div className="outHome" id="home">
                <div className="outDiveHome">
                    <div className="inHome">
                        <SignIn />
                    </div>

                    <div className="inHome">
                        <FeatureList/>
                    </div>
                </div>

                <div className="border"></div>
                <div className="border"></div>
            </div>
        )
    }
}