export default function rollDice(sides) {
    if (typeof(sides) === 'number') {
        return +Math.floor(Math.random() * Math.floor(sides)) + 1
    } else {
        let total = 0;
        sides = sides.replace(/\s/g, '').split('+');
        sides.forEach(val => {
            if (val.includes('d')) {
                val = val.split('d')
                for (let i = 0; i <= val[0]; i++) {
                    total += +Math.floor(Math.random() * Math.floor(val[1])) + 1
                }
            } else {
                total += +val
            }
        })

        return total
    }
}
