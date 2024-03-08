from collections import deque

dx = [-1, 1, 0, 0]
dy = [0, 0, 1, -1]

row = 0
col = 0


def bfs(a, b, board, dist):
    que = deque()
    que.append((a, b, 0))

    while que:
        x, y, count = que.popleft()

        if board[x][y] == 'G':
            return count

        for i in range(4):
            nx = x
            ny = y

            while 0 <= nx + dx[i] < row and 0 <= ny + dy[i] < col and board[nx + dx[i]][ny + dy[i]] != 'D':
                nx += dx[i]
                ny += dy[i]

            if dist[nx][ny] > count + 1:
                dist[nx][ny] = count + 1
                que.append((nx, ny, count + 1))

    for ds in dist:
        print(ds)
    return -1


def solution(board):
    global row
    global col

    answer = 0

    row = len(board)
    col = len(board[0])
    dist = [[1e9 for _ in range(col)] for _ in range(row)]

    for i in range(row):
        for j in range(col):
            if board[i][j] == 'R':
                dist[i][j] = 0
                answer = bfs(i, j, board, dist)

    return answer


