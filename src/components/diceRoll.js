export default function rollDice(diceString) {
    if (typeof (diceString) === 'number') {
        return +Math.floor(Math.random() * Math.floor(diceString)) + 1
    } else {
        let diceExpressionArray = []
        let expressionValue = ""

        diceString.replace(/\s/g, '').split('').forEach((val, i, array) => {
            if (val === '-' || val === '+') {
                diceExpressionArray.push(expressionValue)
                if (i !== array.length - 1) {
                    diceExpressionArray.push(val)
                }
                expressionValue = ""
            }
            if (!isNaN(+val) || val === 'd' || val === "!") {
                expressionValue = expressionValue + val;
            }

            if (i === array.length - 1 && expressionValue !== '') {
                diceExpressionArray.push(expressionValue);
            }
        })

        for (let index = 0; index < diceExpressionArray.length; index++) {
            let val = diceExpressionArray[index];

            if (val.includes('d')) {
                let exploding = val.includes('!')

                val = val.split('d')
                let subtotal = 0
                for (let i = 0; i <= val[0]; i++) {
                    if (exploding) {
                        val[1] = val[1].substring(0, val[1].length-1)
                        subtotal += rollDice(+val[1])
                    } else {
                        subtotal += rollDice(+val[1])
                    }
                }

                diceExpressionArray[index] = subtotal
            }
        }

        return eval(diceExpressionArray.join(""))
    }
}
