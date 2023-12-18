function solution(beginning, target) {
    let map = [...Array(beginning.length)].map(_ => Array(beginning[0].length).fill(false))
    const rLen = beginning.length
    const cLen = beginning[0].length
    
    for (let i = 0 ; i < rLen ; i++){
        for (let j = 0 ; j< cLen ;j++){
            if (beginning[i][j]!==target[i][j]) map[i][j] = !map[i][j]
        }
    }
    
    const changeRow = (n) => {
        for (let i = 0 ; i < cLen ; i++) map[n][i] = !map[n][i]
    }
    const changeCol = (n) => {
        for (let i = 0 ; i < rLen ; i++) map[i][n] = !map[i][n]
    }
    
    const reverseCol = (ret) => {
        for (let i = 0 ; i < cLen ; i++){
            if (map[0][i]) {
                changeCol(i)
                ret ++
            }
        }
        return ret
    }
    
    const reverseRow = (ret) => {
        for (let i = 0 ; i < rLen ; i++){
            if(map[i][0]) {
                changeRow(i)
                ret ++
            }
        }
        return ret
    }
    
    
    
    let rRet = 0
    rRet = reverseCol(rRet)
    rRet = reverseRow(rRet)
    console.log(map)
    
    for (let i = 0 ; i < rLen ; i++){
        for (let j = 0 ; j < cLen ; j++){
            if(map[i][j]) return -1
        }
    }
    
    map = [...Array(beginning.length)].map(_ => Array(beginning[0].length).fill(false))
    for (let i = 0 ; i < rLen ; i++){
        for (let j = 0 ; j< cLen ;j++){
            if (beginning[i][j]!==target[i][j]) map[i][j] = !map[i][j]
        }
    }
    
    let cRet = 1
    changeCol(0)
    cRet = reverseRow(cRet)
    cRet = reverseCol(cRet)
    for (let i = 0 ; i < rLen ; i++){
        for (let j = 0 ; j < cLen ; j++){
            if(map[i][j]) return -1
        }
    }
    
    return Math.min(cRet,rRet)
}