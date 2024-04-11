r,c,t = list(map(int,input().split()))
map = [ list(map(int,input().split())) for _ in range(r)]

dr= [1,0,-1,0]
dc = [0,1,0,-1]

# 배열 내에서 갈 수 있는곳인지 파악
def isCanGo(row,col):
    return 0<=row and row < r and 0<= col and col < c and map[row][col] != -1

def spread(map):
    tmp = [ [0 for _ in range(c)] for __ in range(r)]

    for i in range(r):
        for j in range(c):
            if map[i][j] == -1: # 공기청정기라면 스킵
                tmp[i][j] = -1
                continue
            val = map[i][j] // 5 #확산될 먼지
            for d in range(4):
                nr = i + dr[d]
                nc = j + dc[d]
                if isCanGo(nr,nc):
                    tmp[nr][nc] += val
                    map[i][j] -= val
            tmp[i][j] += map[i][j]

    return tmp

def clean(row,col,dr,dc,map):
    tmp = [arr[:] for arr in map]
    row += dr[0]
    col += dc[0]
    tmp[row][col] = 0 # 처음으로 밀어낸 공기가 있는곳
    for d in range(4): # 4방향으로 한바퀴만 동작
        while 1:
            nr = row + dr[d]
            nc = col + dc[d]
            if isCanGo(nr,nc):
                tmp[nr][nc] = map[row][col]
                row = nr
                col = nc
            else : 
                break
    return tmp

machine = [] # 공기청정기 상단,하단 파악
for i in range(r):
    for j in range(c):
        if map[i][j] == -1:
            machine.append([i,j])


for time in range(t):

    map = spread(map)
    map = clean(machine[0][0],machine[0][1],[0,-1,0,1],[1,0,-1,0],map)
    map = clean(machine[1][0],machine[1][1],[0,1,0,-1],[1,0,-1,0],map)
   


ret = 0
for i in range(r):
    for j in range(c):
        if map[i][j] ==-1:
            continue
        ret += map[i][j]
print(ret)


