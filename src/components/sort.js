export default function sort (fightArr, count) {

    fightArr = fightArr.sort((a, b) => a.action - b.action);

    fightArr.forEach(val => {
        if (val.action > count) {
            val.acting = false
        } else {
            val.acting = true
            val.top = false
        }
    })

    var onDeck = [];
    var acting = [];
    var grave = [];


    fightArr.forEach(val => {
        if (val.acting === true && val.dead === false) {
            acting.push(val)
        } else if (val.acting === false && val.dead === false) {
            onDeck.push(val)
        } else (
            grave.push(val)
        )
    })

    var fighters = {
        acting: acting,
        onDeck: onDeck,
        grave: grave
    }

    console.log( fighters )

}