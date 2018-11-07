import React from 'react'


export default function CounterMiddle (props) {
        return (
            <div className="counterMiddle">
                <h3>the Count</h3>
                <div className={`${props.theme}-border countborder`}></div>
                <h3 className="countNum">{props.count}</h3>
            </div>
        )
}