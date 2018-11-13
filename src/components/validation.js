module.exports = {
    checkStr: (str) => {
        if (str.length > 15) {
            return false
        }
            return true
    },
    
    checkNum: (num) => {
        if (isNaN(num)) {
            return false
        }
            return true
    }

} 