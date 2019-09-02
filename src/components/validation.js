module.exports = {
    checkStr: (str) => {
        if (str.length > 15) {
            return false
        }
            return true
    },
    
    checkNum: (num) => {
        if (typeof(num) === 'number' || '-') {
            return true
        }
            return false
    }

} 