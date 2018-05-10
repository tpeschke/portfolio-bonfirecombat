import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SignIn extends Component {

    render() {

        return (
            <div className='signIn'>
                <div className='signInInner'>
                    <a href={`${process.env.REACT_APP_LOGIN}`}>
                        <button id="signInButton">Sign In Here</button>
                    </a>
                    <p className='signInText'>with your Google, FaceBook, Twitter, or Yahoo account</p>
                    {/* <Link to='/savedfields'><p className='signInText'>Or you can log on as a guest</p></Link> */}
                </div>
            </div>
        )
    }
}

