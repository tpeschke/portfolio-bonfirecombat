import axios from 'axios'

import sort from '../components/sort'

const initialState = {
    count: 1,
    combatId: 0,
    combatName: 'New Battle',
    fighterList: [],
    editopen: false,
    editopen2: false,
    topopen: false,
    topopen2: false
}
//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS'
const LOAD_COMBATANTS = 'LOAD_COMBATANTS'
const INCREASE_COUNT = 'INCREASE_COUNT'
const ADD_NEW_COMBATANT = 'ADD_NEW_COMBATANT'
const KILL_COMBATANT = 'KILL_COMBATANT'
const REMOVE_FIGHTER = 'REMOVE_FIGHTER'
const ADVANCE_SPEED = "ADVANCE_SPEED"

const NEW_FIELD = "NEW_FIELD"
const SAVE_FIELD = "SAVE_FIELD"

const INPUT_ACTION = "INPUT_ACTION"

const OPEN_MODAL = "OPEN_MODAL"
const OPEN_MODAL2 = "OPEN_MODAL2"
const OPEN_TOP = "OPEN_TOP"
const OPEN_TOP2 = "OPEN_TOP2"

const EDIT_FIGHTER = "EDIT_FIGHTER"
const HANDLE_TOP = "HANDLE_TOP"

//ACTION BUILDERS

export function GETCOMBATFIGHTERS(id, name, count) {
    return {
        type: GET_COMBAT_FIGHTERS,
        payload: id,
        name: name,
        count: count
    }
}

export function LOADCOMBATANTS(id) {
    return {
        type: LOAD_COMBATANTS,
        payload: axios.get(`/api/combat/${id}`).then()
    }
}

export function ADDNEWCOMBATANT(fighter) {
    return {
        type: ADD_NEW_COMBATANT,
        payload: fighter
    }
}

export function KILLCOMBATANT(id) {
    return {
        type: KILL_COMBATANT,
        payload: id
    }
}

export function REMOVEFIGHTER(id) {
    return {
        type: REMOVE_FIGHTER,
        payload: id
    }
}

export function ADVANCESPEED(id) {
    return {
        type: ADVANCE_SPEED,
        payload: id
    }
}

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

export function INPUTACTION(id, input) {
    return {
        type: INPUT_ACTION,
        payload: input,
        id: id
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

export function EDITFIGHTER(fighter) {
    return {
        type: EDIT_FIGHTER,
        payload: fighter
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

export function HANDLETOP(fighter) {
    return {
        type: HANDLE_TOP,
        payload: fighter
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

        case INCREASE_COUNT:
            var newCount = +state.count + 1
            var fighter = sort(state.fighterList, newCount)
            return Object.assign({}, state, { count: newCount, fighterList: fighter })

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

        case INPUT_ACTION:
            var updatedAction = sort(state.fighterList.map(val => {
                if (val.id === action.id) {
                    val.actioncount = action.payload
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
                    val.top = '1'
                    return val
                } else {
                    return val
                }
            }), state.count)
            return Object.assign({}, state, { fighterList: topfighter })

        default: return state
    }
}