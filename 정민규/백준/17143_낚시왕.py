R,C,M = map(int,input().split())

ocean = [ [[] for _ in range(C)] for __ in range(R)]

dc = [0,0,0,1,-1]
dr = [0,-1,1,0,0]

for _ in range(M):
   r,c,s,d,z = map(int,input().split())
   ocean[r-1][c-1] = [s,d,z]

def isCanGo(r,c):
    return 0<=r and r< R and 0<=c and c<C

def getNextSharkDist(s,d,r,c):
    for _ in range(s):
        nR = r + dr[d]
        nC = c + dc[d]
        if isCanGo(nR,nC):
            r = nR
            c = nC
        else:
            d = d+1 if d%2 else d-1
            r = r + dr[d]
            c = c + dc[d]
    return [r,c,d]


def moveSharks(ocean):
    ret = [ [[] for _ in range(C)] for __ in range(R)]

    for i in range(R):
        for j in range(C):
            if len(ocean[i][j]) == 0:
                continue
            s,d,z = ocean[i][j]
            nR,nC,nD = getNextSharkDist(s,d,i,j)
            if len(ret[nR][nC]) and ret[nR][nC][2] >= z:
                continue
            ret[nR][nC] = [s,nD,z]
    
    return ret

def killShark(col,ocean):
    for row in range(R):
        if len(ocean[row][col]):
            ret = ocean[row][col][2]
            ocean[row][col] = []
            return ret
    return 0


ret = 0

for col in range(C):
    ret += killShark(col,ocean)
    ocean = moveSharks(ocean)

print(ret)