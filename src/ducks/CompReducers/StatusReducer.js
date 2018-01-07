import axios from 'axios'

const GET_ALL_STATUSES = 'GET_ALL_STATUSES'
const DELETE_STATUSES = "DELETE_STATUSES"
const ADD_NEW_STATUS = "ADD_NEW_STATUS"

// ==========================================

export function GETALLSTATUSES(id) {
    return {
        type: GET_ALL_STATUSES,
        payload: axios.get(`/api/status/${id}`).then()
    }
}

export function DELETESTATUSES(id) {
    return {
        type: DELETE_STATUSES,
        payload: id
    }
}

export function ADDNEWSTATUS(status) {
    return {
        type: ADD_NEW_STATUS,
        payload: status
    }
}