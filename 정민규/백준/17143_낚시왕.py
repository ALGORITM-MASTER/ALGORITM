R,C,M = map(int,input().split())

ocean = [ [[] for _ in range(C)] for __ in range(R)]

# 문제에서 제공한 방향과 인덱스를 맞춤
dc = [0,0,0,1,-1]
dr = [0,-1,1,0,0]

# 바다에 상어 정보 저장
for _ in range(M):
   r,c,s,d,z = map(int,input().split())
   ocean[r-1][c-1] = [s,d,z]

# 바다에서 벗어나는 범위인지 파악
def isCanGo(r,c):
    return 0<=r and r< R and 0<=c and c<C

# 속도,거리를 계산하여 상어의 다음 위치 계산
def getNextSharkDist(s,d,r,c):
    for _ in range(s):
        nR = r + dr[d]
        nC = c + dc[d]
        if isCanGo(nR,nC):
            r = nR
            c = nC
        else: # 갈 수 없다면 방향전환
            d = d+1 if d%2 else d-1
            r = r + dr[d]
            c = c + dc[d]
    return [r,c,d]

# 모든 상어들을 1초 움직임
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

# 낚시꾼이 상어를 낚음
def killShark(col,ocean):
    for row in range(R):
        if len(ocean[row][col]):
            ret = ocean[row][col][2]
            ocean[row][col] = []
            return ret
    return 0


ret = 0

#시뮬레이션
for col in range(C):
    ret += killShark(col,ocean)
    ocean = moveSharks(ocean)

print(ret)