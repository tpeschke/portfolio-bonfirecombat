import axios from 'axios'
import sort from '../components/sort'
import makeid from '../components/makeid'
import socketFun from '../playerview/SocketApi'
import _ from 'lodash'
import rollDice from '../components/diceRoll'
import { ToastContainer } from "react-toastr";

const initialState = {
    user: {},
    hash: null,
    page: '/',
    count: 1,
    combatId: 0,
    combatName: 'New Battle',
    playerview: false,
    theme: 'h',

    fighterList: [],
    statusList: [],

    editopen: false,
    editopen2: false,
    topopen: false,
    topopen2: false,
    weaponModal: false,
    weaponModal2: false,
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

const WEAPON_MODAL = "WEAPON_MODAL"
const WEAPON_MODAL2 = "WEAPON_MODAL2"

const SELECT_WEAPON = "SELECT_WEAPON"
const ADD_WEAPON = "ADD_WEAPON"
const DELETE_WEAPON = "DELETE_WEAPON"

const ROLL_INIT = "ROLL_INIT"

const HIDE_FIGHTER = "HIDE_FIGHTER"

const SET_THEME = "SET_THEME"

//ACTION BUILDERS

export function NEWFIELD(routing) {
    return {
        type: NEW_FIELD,
        payload: axios.post(`/api/newfield`).then(result => {
            if (result.status === 200) {
                routing('/Battlefield')
                return result
            } else if (result.status === 403) {
                console.log(result.data)
                return {}
            }
        })
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

export function WEAPONMODAL() {
    return {
        type: WEAPON_MODAL
    }
}

export function WEAPONMODAL2() {
    return {
        type: WEAPON_MODAL2
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

export function SELECTWEAPON(weapon, id) {
    return {
        type: SELECT_WEAPON,
        payload: { weapon, id }
    }
}

export function ADDWEAPON(id, weapon, speed, wid) {
    return {
        type: ADD_WEAPON,
        payload: id,
        weapon,
        speed,
        wid
    }
}

export function DELETEWEAPON(id, weapon) {
    return {
        type: DELETE_WEAPON,
        payload: { id, weapon }
    }
}

export function ROLLINIT(id, dice, mod) {
    return {
        type: ROLL_INIT,
        load: { id, dice, mod }
    }
}

export function HIDEFIGHTER(id) {
    return {
        type: HIDE_FIGHTER,
        info: id
    }
}

export function SETTHEME(theme) {
    return {
        type: SET_THEME,
        payload: theme
    }
}

//REDUCER

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_COMBAT_FIGHTERS:
            return Object.assign({}, state, { combatId: action.payload, combatName: action.name, count: +action.count })

        case LOAD_COMBATANTS + '_FULFILLED':
            var fighters = sort(action.payload.data, state.count);
            return Object.assign({}, state, { fighterList: fighters })

        case GET_ALL_STATUSES + '_FULFILLED':
            return Object.assign({}, state, { statusList: action.payload.data })

        case GET_HASH + '_FULFILLED':
            return Object.assign({}, state, { hash: action.payload.data[0].urlhash })

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
            if (!isNaN(action.payload)) {
                axios.delete(`/api/fighter/${action.payload}`).then()
            }
            return Object.assign({}, state, { fighterList: gonefighter })

        case ADVANCE_SPEED:
            var speedFighter = sort(state.fighterList.map((val, i) => {
                if (val.id === action.payload) {
                    val.actioncount = +val.actioncount + +action.speed
                    return val
                } else {
                    return val
                }
            }), state.count)

            return Object.assign({}, state, { fighterList: speedFighter })

        case NEW_FIELD + '_FULFILLED':
            var { id, namecombat, urlhash } = action.payload.data[0]
            return Object.assign({}, state, { combatId: id, combatName: namecombat, fighterList: [], statusList: [], count: 1, urlhash })

        case NEW_FIELD + '_REJECTED':
            return Object.assign({}, state)

        case SAVE_FIELD + "_PENDING":
            return Object.assign({}, state, { pendingSaveOpen: !state.pendingSaveOpen })

        case SAVE_FIELD + "_FULFILLED":
            let sortedFighters = sort(action.payload.data[0], state.count)
            return Object.assign({}, state, { fighterList: sortedFighters, statusList: action.payload.data[1], pendingSaveOpen: !state.pendingSaveOpen, finishedSaveOpen: !state.finishedSaveOpen })

        case INPUT_ACTION:
            let updatedAction = []

            if (action.flipswitch) {
                updatedAction = state.fighterList.map(val => {
                    if (val.id === action.id) {
                        val.actioncount = +action.payload
                        return val
                    } else {
                        return val
                    }
                })
            } else {
                updatedAction = sort(state.fighterList.map(val => {
                    if (val.id === action.id) {
                        val.actioncount = +action.payload
                        return val
                    } else {
                        return val
                    }
                }), state.count)
            }

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

        case WEAPON_MODAL:
            if (state.weaponModal === false) {
                return Object.assign({}, state, { weaponModal: true })
            } else {
                return Object.assign({}, state, { weaponModal: false })
            }

        case WEAPON_MODAL2:
            if (state.weaponModal2 === false) {
                return Object.assign({}, state, { weaponModal2: true })
            } else {
                return Object.assign({}, state, { weaponModal2: false })
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
            return Object.assign({}, state, { statusList: modifiedStatus })

        case ADD_NEW_STATUS:
            var newStatus = state.statusList.concat(action.payload)
            return Object.assign({}, state, { statusList: newStatus })

        case CHANGE_BATTLE_NAME:
            if (action.payload) {
                return Object.assign({}, state, { combatName: action.payload })
            }
        // don't put a break here: it screws with the combatId weirdly enough

        case PAGE_LOCATION:
            return Object.assign({}, state, { page: action.payload })

        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload, theme: action.payload.data.theme })

        case GET_USER_INFO + '_REJECTED':
            return Object.assign({}, state, { user: { error: true } })

        case OPEN_SETTINGS:
            return Object.assign({}, state, { settings: !state.settings })

        case FLIP_TOOLTIP:
            var tempUser = Object.assign({}, state.user)
            tempUser.data.tooltip === '1' ? tempUser.data.tooltip = '0' : tempUser.data.tooltip = '1';
            axios.post(`/api/settings`, tempUser.data).then()
            return Object.assign({}, state, { user: tempUser })

        case TOGGLE_SAVE:
            return Object.assign({}, state, { finishedSaveOpen: !state.finishedSaveOpen })

        case TOGGLE_PLAYERVIEW:
            return Object.assign({}, state, { playerview: !state.playerview })

        case SELECT_WEAPON:
            let { weapon, id } = action.payload
            let fighters = state.fighterList.map(val => {
                if (val.id == id) {
                    val.weapons.forEach(w => {
                        if (w.id == weapon) {
                            w.selected = '1'
                        } else { w.selected = '0' }
                    })
                }
                return val
            })
            return Object.assign({}, state, { fighterList: fighters })

        case ADD_WEAPON:
            let fighter = state.fighterList.slice().map(val => {
                if (val.id == action.payload) {
                    if (action.wid) {
                        val.weapons.forEach((v, i) => {
                            if (v.id == action.wid) {
                                let selected = v.selected
                                val.weapons.splice(i, 1, { weapon: action.weapon, speed: action.speed, selected: selected, id: action.wid })
                            }
                        })
                    } else {
                        val.weapons.push({ weapon: action.weapon, speed: action.speed, selected: '0', id: makeid() })
                    }
                }
                return val
            })
            return Object.assign({}, state, { fighterList: fighter })

        case DELETE_WEAPON:
            let { payload } = action
            let tempFighter = state.fighterList.map(val => {
                if (val.id == payload.id) {
                    if (val.weapons.length > 1 && payload.weapon !== 1) {
                        val.weapons.forEach((v, i) => {
                            if (payload.weapon == v.id) {
                                if (v.selected == '1') {
                                    val.weapons.forEach(u => {
                                        if (u.id == 1) {
                                            u.selected = '1'
                                        }
                                    })
                                }
                                val.weapons.splice(i, 1)
                            }
                        })
                    }
                }
                return val
            })
            return Object.assign({}, state, { fighterList: tempFighter })

        case ROLL_INIT:
            let { load } = action
            let newFighter = sort(state.fighterList.map(v => {
                if (v.id == load.id) {
                    v.actioncount = +rollDice(load.dice) + +load.mod + state.count
                }
                return v
            }), state.count)
            return Object.assign({}, state, { fighterList: newFighter })

        case HIDE_FIGHTER:
            let { info } = action
            let hiddenFighter = state.fighterList.map(v => {
                if (v.id == info) {
                    if (v.hidden === '1') {
                        v.hidden = '0'
                    } else {
                        v.hidden = '1'
                    }
                }
                return v
            })

            return Object.assign({}, state, { fighterList: hiddenFighter })

        case SET_THEME:
            return Object.assign({}, state, { theme: action.payload })

        default: return state
    }
}