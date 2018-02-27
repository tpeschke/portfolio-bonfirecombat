import axios from 'axios'

import sort from '../components/sort'

const initialState = {
    user: {},
    hash: null,
    page: '/',
    count: 1,
    combatId: 0,
    combatName: 'New Battle',
    playerview: false,

    fighterList: [],
    statusList: [],

    editopen: false,
    editopen2: false,
    topopen: false,
    topopen2: false,
    pendingSaveOpen: false,
    finishedSaveOpen: false,
    settings: false
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
const CLEAR_FIELD = "CLEAR_FIELD"

const INPUT_ACTION = "INPUT_ACTION"

const OPEN_MODAL = "OPEN_MODAL"
const OPEN_MODAL2 = "OPEN_MODAL2"
const OPEN_TOP = "OPEN_TOP"
const OPEN_TOP2 = "OPEN_TOP2"

const EDIT_FIGHTER = "EDIT_FIGHTER"
const HANDLE_TOP = "HANDLE_TOP"

const GET_ALL_STATUSES = "GET_ALL_STATUSES"
const DELETE_STATUSES = "DELETE_STATUSES"
const ADD_NEW_STATUS = "ADD_NEW_STATUS"

const CHANGE_BATTLE_NAME = "CHANGE_BATTLE_NAME"

const PAGE_LOCATION = "PAGE_LOCATION"

const GET_USER_INFO = "GET_USER_INFO"

const OPEN_SETTINGS = "OPEN_SETTINGS"

const SAVE_FIELD = "SAVE_FIELD"

const FLIP_TOOLTIP = "FLIP_TOOLTIP"

const TOGGLE_SAVE = "TOGGLE_SAVE"

const TOGGLE_PLAYERVIEW = "TOGGLE_PLAYERVIEW"

const GET_HASH = "GET_HASH"

//ACTION BUILDERS

export function NEWFIELD(id) {
    return {
        type: NEW_FIELD,
        payload: axios.post(`/api/newfield/${id}`).then()
    }
}

export function SAVEFIELD(field) {
    return {
        type: SAVE_FIELD,
        payload: axios.patch('/api/battle', field).then()
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

export function CHANGEBATTLENAME(newName) {
    return {
        type: CHANGE_BATTLE_NAME,
        payload: newName
    }
}

export function PAGELOCATION(url) {
    return {
        type: PAGE_LOCATION,
        payload: url
    }
}

export function getUserInfo() {
    return {
        type: GET_USER_INFO,
        payload: axios.get('/auth/me').then()
    }
}

export function OPENSETTINGS() {
    return {
        type: OPEN_SETTINGS
    }
}

export function FLIPTOOLTIP() {
    return {
        type: FLIP_TOOLTIP
    }
}

export function TOGGLESAVE() {
    return {
        type: TOGGLE_SAVE
    }
}

export function TOGGLEPLAYERVIEW() {
    return {
        type: TOGGLE_PLAYERVIEW
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
            return Object.assign({}, state, { statusList: action.payload.data })

        case GET_HASH + '_FULFILLED':
            return Object.assign({}, state, { hash : action.payload.data[0].urlhash}) 

        case INCREASE_COUNT:
            var newCount = +state.count + 1
            var fighter = sort(state.fighterList, newCount)
            return Object.assign({}, state, { count: newCount, fighterList: fighter })

        case DECREASE_COUNT:
            var decCount = +state.count
            if (decCount > 1) {
                decCount -= 1
            }
            var lowFighter = sort(state.fighterList, decCount)
            return Object.assign({}, state, { count: decCount, lowFighter })

        case RESET_COUNT:
            var resetFighter = sort(state.fighterList, 1)
            return Object.assign({}, state, { count: 1, fighterList: resetFighter })

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
            axios.delete(`/api/fighter/${action.payload}`).then()
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
            return Object.assign({}, state, { combatId: id, combatName: namecombat, fighterList: [], statusList: [], count: 1 })

        case SAVE_FIELD + "_PENDING":
            return Object.assign({}, state, {pendingSaveOpen : !state.pendingSaveOpen})

        case SAVE_FIELD + "_FULFILLED":
            return Object.assign({}, state, {pendingSaveOpen : !state.pendingSaveOpen, finishedSaveOpen: !state.finishedSaveOpen})

        case INPUT_ACTION:
            var updatedAction = sort(state.fighterList.map(val => {
                if (val.id === action.id) {
                    if (action.payload) {
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
                    val.actioncount = state.count + action.payload.failedBy
                    val.topcheck = '1'
                    return val
                } else {
                    return val
                }
            }), state.count)
            return Object.assign({}, state, { fighterList: topfighter })

        case CLEAR_FIELD:
            return Object.assign({}, state, { fighterList: [] })

        case DELETE_STATUSES:
            var modifiedStatus = []
            for (var i = 0; i < state.statusList.length; i++) {
                if (state.statusList[i].id !== action.payload) {
                    modifiedStatus.push(state.statusList[i])
                }
            }
            axios.delete(`/api/status/${action.payload}`).then()
        return Object.assign( {}, state, { statusList: modifiedStatus})

        case ADD_NEW_STATUS:
            var newStatus = state.statusList.concat(action.payload)
            return Object.assign( {}, state, { statusList: newStatus})

        case CHANGE_BATTLE_NAME:
            if (action.payload) {
            return Object.assign( {}, state, { combatName: action.payload })
            }
            // don't put a break here: it screws with the combatId weirdly enough

        case PAGE_LOCATION:
            return Object.assign( {}, state, { page: action.payload})

        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })

        case OPEN_SETTINGS:
            return Object.assign({}, state, { settings: !state.settings})

        case FLIP_TOOLTIP:
            var tempUser = Object.assign( {} ,state.user)
            tempUser.data.tooltip === '1' ? tempUser.data.tooltip = '0' : tempUser.data.tooltip = '1';
            axios.post(`/api/settings`, tempUser.data).then()
            return Object.assign({}, state, {user : tempUser})

        case TOGGLE_SAVE:
            return Object.assign({}, state, { finishedSaveOpen: !state.finishedSaveOpen})

        case TOGGLE_PLAYERVIEW:
            return Object.assign({}, state, { playerview: !state.playerview})
    
        default: return state
    }
}