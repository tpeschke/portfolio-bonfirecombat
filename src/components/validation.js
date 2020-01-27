module.exports = {
    checkStr: (str) => {
        if (str.length > 13) {
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