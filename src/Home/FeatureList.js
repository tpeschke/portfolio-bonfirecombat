import React, {Component} from 'react';
import FlipMove from 'react-flip-move'


export default class FeatureList extends Component {
    constructor() {
        super()

        this.state = {
            features: [{id: 1, content: "Keep and track mutiple fighters' counts and speeds at once" }, 
                        {id: 2, content: "Save and Edit battlefields on the fly"},
                        {id: 3, content: "Auto sorting lists"},
                        {id: 4, content: "Custom color notation to help keep track of tokens"},
                        {id: 5, content: "Count tracker with keyboard shortcuts"},
                        {id: 6, content: "Fully animated sorting"},
                        {id: 7, content: "Status tracker with countdown timers"},
                        {id: 8, content: "Easily remove combatants from the field"},
                        {id: 9, content: "Easily resurrect the dead"},
                        {id: 10, content: "Tablet and smartphone responsive"},
                        {id: 11, content: "Take your battles anywhere"},
                        {id: 12, content: "Crush your enemies before you"},
                        {id: 13, content: "See them driven before you"},
                        {id: 14, content: "Hear the lamantations of their women"}
                        ],
            intervalId: 0
        }
    }

    // {content: ""},

    componentDidMount() {
        this.setState({ intervalId: setInterval(this.rotate, 3000)})    
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    rotate = () => {
        var tempArr = this.state.features.slice();
        tempArr.push(tempArr.shift());
        this.setState({ features: tempArr })
    }

    render() {

            var features = this.state.features.map((feature, i) => {
                return <p key={feature.id} className="featureList" id={feature.id%2===0 ? 'odd': null}>
                    {feature.content}
                </p>
            })

        return (
            <div>
                <h2>Features:</h2>
                <div className="outerFeatures">
                <FlipMove>
                    {features}
                </FlipMove>
                </div>
            </div>
        )
    }
}