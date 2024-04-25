import sys
sys.setrecursionlimit(100000)
N,M = map(int,input().split())

area = [ list(map(int,input().split())) for _ in range(N)]
dc = [1,0,-1,0]
dr = [0,1,0,-1]

def checkAreaIsFull(area):
    for i in range(N):
        for j in range(N):
            if area[i][j] ==0:
                return False
    return True

def isCanGo(r,c,area):
    return 0<=r and r < N and 0<=c and c<N

def spread(area):
    tmp = [ary[:] for ary in area]
    for i in range(N):
        for j in range(N):
            if area[i][j] == 3:
                for d in range(4):
                    nr = i + dr[d]
                    nc = j + dc[d]
                    if isCanGo(nr,nc,area) and area[nr][nc] != 1:
                        tmp[nr][nc] = 3
    return tmp

def isSameAry(a,b):
    for i in range(N):
        for j in range(N):
            if a[i][j] != b[i][j]:
                return False
    return True

def simulation(area):
    time = 0
    while 1:
        tmp = spread(area)
        if checkAreaIsFull(area):
            return time
        if isSameAry(tmp,area):
            return -1
        area = tmp
        time +=1

def getNextCood(r,c):
    if c<N-1:
        return [r,c+1]
    return [r+1,0]


ret = 10e9



def setBirus(area,cnt,r,c):
    global ret
    if not isCanGo(r,c,area):
        return
    if cnt == M:
        time = simulation(area)
        if time!= -1:
            ret = min(ret,time)
    nR,nC = getNextCood(r,c)

    if area[r][c] == 2:
        
        area[r][c] = 3
        setBirus(area,cnt+1,nR,nC)
        area[r][c] = 2

    setBirus(area,cnt,nR,nC)
    
setBirus(area,0,0,0)

print(ret if ret != 10e9 else -1 )

