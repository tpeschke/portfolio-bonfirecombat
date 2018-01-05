
//TYPES

const INCREASE_COUNT = 'INCREASE_COUNT' 
const DECREASE_COUNT = "DECREASE_COUNT"
const RESET_COUNT = 'RESET_COUNT'

//ACTION BUILDERS

export function INCREASECOUNT() {
    return {
        type: INCREASE_COUNT,
    }
}


export function DECREASECOUNT() {
    return {
        type: DECREASE_COUNT
    }
}

export function RESETCOUNT() {
    return {
        type: RESET_COUNT
    }
}