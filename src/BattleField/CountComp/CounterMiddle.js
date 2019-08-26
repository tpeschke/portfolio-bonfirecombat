import React from 'react'


export default function CounterMiddle (props) {
        return (
            <div className={`counterMiddle`} >
                <h3 className={`${props.theme}-font ${props.theme}-color`}>the Clock</h3>
                <div className={`${props.theme}-border countborder`}></div>
                <h3 className={`countNum ${props.theme}-font ${props.theme}-color`}>{props.count}</h3>
            </div>
        )
}