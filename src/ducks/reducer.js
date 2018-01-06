import axios from 'axios'

import sort from '../components/sort'

const initialState = {
    count: 1,
    combatId: 0,
    combatName: 'New Battle',
    fighterList: [],
    statusList: [],
    editopen: false,
    editopen2: false,
    topopen: false,
    topopen2: false
}
//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS'
const LOAD_COMBATANTS = 'LOAD_COMBATANTS'

const INCREASE_COUNT = 'INCREASE_COUNT'
const DECREASE_COUNT = "DECREASE_COUNT"
const RESET_COUNT = 'RESET_COUNT'

const ADD_NEW_COMBATANT = 'ADD_NEW_COMBATANT'
const KILL_COMBATANT = 'KILL_COMBATANT'

const REMOVE_FIGHTER = 'REMOVE_FIGHTER'
const ADVANCE_SPEED = "ADVANCE_SPEED"

const NEW_FIELD = "NEW_FIELD"
const SAVE_FIELD = "SAVE_FIELD"
const CLEAR_FIELD = "CLEAR_FIELD"

const INPUT_ACTION = "INPUT_ACTION"

const OPEN_MODAL = "OPEN_MODAL"
const OPEN_MODAL2 = "OPEN_MODAL2"
const OPEN_TOP = "OPEN_TOP"
const OPEN_TOP2 = "OPEN_TOP2"

const EDIT_FIGHTER = "EDIT_FIGHTER"
const HANDLE_TOP = "HANDLE_TOP"

const GET_ALL_STATUSES = "GET_ALL_STATUSES"

//ACTION BUILDERS

export function NEWFIELD() {
    return {
        type: NEW_FIELD,
        payload: axios.get('/api/battle').then()
    }
}

export function SAVEFIELD() {
    return {
        type: SAVE_FIELD,
        payload: axios.patch('/api/battle').then()
    }
}

export function CLEARFIELD() {
    return {
        type: CLEAR_FIELD,
    }
}


export function OPENMODAL() {
    return {
        type: OPEN_MODAL
    }
}

export function OPENMODAL2() {
    return {
        type: OPEN_MODAL2
    }
}

export function OPENTOP() {
    return {
        type: OPEN_TOP
    }
}

export function OPENTOP2() {
    return {
        type: OPEN_TOP2
    }
}

//REDUCER

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_COMBAT_FIGHTERS:
            return Object.assign({}, state, { combatId: action.payload, combatName: action.name, count: +action.count })

        case LOAD_COMBATANTS + '_FULFILLED':
            state.fighterList = action.payload.data
            var fighters = sort(state.fighterList, state.count);
            return Object.assign({}, state, { fighterList: fighters })

        case GET_ALL_STATUSES + '_FULFILLED':
            return Object.assign ( {}, state, {statusList: action.payload.data})

        case INCREASE_COUNT:
            var newCount = +state.count + 1
            var fighter = sort(state.fighterList, newCount)
            return Object.assign({}, state, { count: newCount, fighterList: fighter })

        case DECREASE_COUNT:
            var decCount = +state.count
            if (decCount > 1) {
                decCount-=1
            }
            var lowFighter = sort(state.fighterList, decCount)
            return Object.assign( {}, state, { count: decCount, lowFighter})

        case RESET_COUNT:
            var resetFighter = sort(state.fighterList, 1)
            return Object.assign ( {}, state, { count: 1, fighterList: resetFighter })

        case ADD_NEW_COMBATANT:
            var newfighters = sort(state.fighterList.concat(action.payload), state.count)
            return Object.assign({}, state, { fighterList: newfighters })

        case KILL_COMBATANT:
            var removedfighter = state.fighterList.map(val => {
                if (val.id === action.payload) {
                    val.dead === '1' ? val.dead = '0' : val.dead = '1'
                    return val
                } else {
                    return val
                }
            })
            return Object.assign({}, state, { fighterList: removedfighter })

        case REMOVE_FIGHTER:
            var gonefighter = state.fighterList.filter((val, i) => {
                if (val.id === action.payload) {
                } else {
                    return val
                }
            })
            return Object.assign({}, state, { fighterList: gonefighter })

        case ADVANCE_SPEED:
            var speedFighter = sort(state.fighterList.filter((val, i) => {
                if (val.id === action.payload) {
                    val.actioncount += val.speed
                    return val
                } else {
                    return val
                }
            }), state.count)
            return Object.assign({}, state, { fighterList: speedFighter })

        case NEW_FIELD + '_FULFILLED':
            var { id, namecombat } = action.payload.data[0]
            return Object.assign({}, state, { combatId: id, combatName: namecombat })

        case SAVE_FIELD + "_FULFILLED":
            console.log('Finished :D')
            break

        case INPUT_ACTION:
            var updatedAction = sort(state.fighterList.map(val => {
                if (val.id === action.id) {
                    if(action.payload){
                        val.actioncount = action.payload
                    }
                    return val
                } else {
                    return val
                }
            }), state.count)
            return Object.assign({}, state, { fighterList: updatedAction })

        case OPEN_MODAL:
            if (state.editopen === false) {
                return Object.assign({}, state, { editopen: true })
            } else {
                return Object.assign({}, state, { editopen: false })
            }

        case OPEN_MODAL2:
            if (state.editopen2 === false) {
                return Object.assign({}, state, { editopen2: true })
            } else {
                return Object.assign({}, state, { editopen2: false })
            }

        case EDIT_FIGHTER:
            var editedFighter = sort(state.fighterList.map(val => {
                if (val.id === action.payload.id) {
                    val.namefighter = action.payload.namefighter
                    val.colorcode = action.payload.colorcode
                    val.speed = action.payload.speed
                    return val
                } else {
                    return val
                }
            }), state.count)
            return Object.assign({}, state, { fighterList: editedFighter })

        case OPEN_TOP:
            if (state.topopen === false) {
                return Object.assign({}, state, { topopen: true })
            } else {
                return Object.assign({}, state, { topopen: false })
            }

        case OPEN_TOP2:
            if (state.topopen2 === false) {
                return Object.assign({}, state, { topopen2: true })
            } else {
                return Object.assign({}, state, { topopen2: false })
            }

        case HANDLE_TOP:
            var topfighter = sort(state.fighterList.map(val => {
                if (val.id === action.payload.id) {
                    val.actioncount = val.actioncount + action.payload.failedBy
                    val.topcheck = '1'
                    return val
                } else {
                    return val
                }
            }), state.count)
            return Object.assign({}, state, { fighterList: topfighter })

        case CLEAR_FIELD:
            return Object.assign( {}, state, { fighterList: [] })

        default: return state
    }
}