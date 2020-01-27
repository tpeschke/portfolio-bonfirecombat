
export default function sort(fightArr, count) {

    fightArr.sort((a, b) => a.actioncount - b.actioncount);

        fightArr.forEach(val => {
            if (val.actioncount > count || val.hidden == 1) {
                val.acting = '1'
            } else {
                val.acting = '0'
                val.topcheck = '0'
            }
        })
       
    return fightArr

}