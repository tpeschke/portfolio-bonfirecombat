import io from 'socket.io-client'
const socket = io(process.env.PORT)

const socketFun = {
    sendBattle(data) {
        socket.emit('battleSend', data)
    },
    updateCount(data) {
        socket.emit('updateCount', data)
    },
    playerTop(data) {
        socket.emit('playerTop', data)
    },
    playerKill(data) {
        socket.emit('playerKill', data)
    },
    playerUnTop(data) {
        socket.emit('playerUnTop', data)
    },
    playerResurrect(data){
        socket.emit('playerResurrect', data)
    },
    playerUpdate(data) {
        socket.emit('playerUpdate', data)
    },
    playerAddStatus(data) {
        socket.emit('playerAddStatus', data)
    },
    playerDelStatus(data) {
        socket.emit('playerDelStatus', data)
    },
    playerAdd(data) {
        socket.emit('playerAdd', data)
    },
    playerRemove(data) {
        socket.emit('playerRemove', data)
    },
    playerClear(data) {
        socket.emit('playerClear', data)
    },
    playerEdit(data) {
        socket.emit('playerEdit', data)
    },
    playerWeapon(data) {
        socket.emit('playerWeapon', data)
    }
}

export default socketFun