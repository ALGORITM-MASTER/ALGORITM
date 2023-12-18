function solution(maps) {
    
    const dx = [1,0,-1,0]
    const dy = [0,1,0,-1]
    
    const m = maps.length
    const n = maps[0].length
    
    
    const visited = [...Array(m)].map(v => Array(n).fill(false))
    
    const que = [[0,0,1]]
    visited[0][0] = true
        
    while (que.length) {
        const [y,x,cnt] = que.shift()
        if (y===(m-1) && x === (n-1)) return cnt
        
        
        for (let k = 0 ; k < 4 ; k ++) {
            const ny = y + dy[k]
            const nx = x + dx[k]
            if (0<= nx && nx < n && 0 <= ny && ny < m && !visited[ny][nx] && maps[ny][nx]){
                que.push([ny,nx,cnt+1])
                visited[ny][nx] = true
            }
        }
    }
    
    return -1
    
}