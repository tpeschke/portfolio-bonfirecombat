module.exports = {
    checkStr: (str) => {
        if (str.length > 10) {
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