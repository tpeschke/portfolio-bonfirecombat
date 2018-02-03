import io from 'socket.io-client'
const socket = io(process.env.PORT)

const socketFun = {
    sendBattle(data) {
        socket.emit('battleSend', data)
    },
    updateCount(data) {
        socket.emit('updateCount', data)
    }
   
}

export default socketFun