import React, { Component } from 'react'
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal'

import './SaveModals.css'

export default class SaveFieldModal extends Component {
    constructor() {
        super()

        this.state = {
            first: false,
            second: false,
            third: false,
            fourth: false,
            fifth: false,
            id: null,
        }
    }

    componentWillReceiveProps(next){
        next.finished !== this.props.finished && !this.props.finished ? setTimeout(this.props.TOGGLESAVE, 1000) : null;
        next.pending !== this.props.pending && !this.props.pending ? this.startBar() : clearInterval(this.state.id);
    }

    componentDidMount() {
        this.startBar()
    }

    startBar = () => {
        this.setState({ id: setInterval( this.loadingBar, 600)})
    }

    loadingBar = () => {
        this.runFirst()
        setTimeout(this.runSecond, 150)
        setTimeout(this.runThird, 300)
        setTimeout(this.runFourth, 450)
        setTimeout(this.runFifth, 600)
    }

    runFirst = () => {
        setTimeout(this.setState({ first : !this.state.first }), 600)
    }

    runSecond = () => {
        setTimeout(this.setState({ second : !this.state.second }), 600)
    }

    runThird = () => {
        setTimeout(this.setState({ third : !this.state.third }), 600)
    }

    runFourth = () => {
        setTimeout(this.setState({ fourth : !this.state.fourth }), 600)
    }
    
    runFifth = () => {
        setTimeout(this.setState({ fifth : !this.state.fifth }), 600)
    }

    render() {

        var { first, second,  third, fourth, fifth } = this.state
        var {pending, finished} = this.props

        return (
            <div>
                <Modal open={pending} little
                    classNames={{ modal : 'baseModalSave' }}
                    showCloseIcon={false}>
                    <div className="outModal">
                        <h1 className="outModal">Saving</h1>
                        <div className="loadBar">
                            <div className={first && pending ? "loadbit active first" : "loadbit first"}></div>
                            <div className={second && pending ? "loadbit active" : "loadbit"}></div>
                            <div className={third && pending ? "loadbit active" : "loadbit"}></div>
                            <div className={fourth && pending ? "loadbit active" : "loadbit"}></div>
                            <div className={fifth && pending ? "loadbit active last" : "loadbit last"}></div>
                        </div>
                    </div>
                </Modal>

                <Modal open={finished} little
                    classNames={{ modal: 'baseModalSave' }}
                    showCloseIcon={false}>
                    <div>
                        <h1>Saved</h1>
                    </div>
                </Modal>
            </div>
        )
    }
}