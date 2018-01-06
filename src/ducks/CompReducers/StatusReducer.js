import axios from 'axios'

const GET_ALL_STATUSES = 'GET_ALL_STATUSES'
const DELETE_STATUSES = "DELETE_STATUSES"

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