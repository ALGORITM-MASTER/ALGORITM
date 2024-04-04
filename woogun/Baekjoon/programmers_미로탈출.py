from collections import deque

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]


def bfs(a, b, maps, end):
    row = len(maps)
    col = len(maps[0])

    visited = [[False] * col for _ in range(row)]
    visited[a][b] = True

    que = deque()
    que.append((a, b, 0))

    while que:
        x, y, cost = que.popleft()

        if maps[x][y] == end:
            return cost

        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if 0 <= nx < row and 0 <= ny < col and not visited[nx][ny]:
                if maps[nx][ny] != "X":
                    que.append((nx, ny, cost + 1))
                    visited[nx][ny] = True

    return -1


def find_start(start, maps):
    for i in range(len(maps)):
        for j in range(len(maps[0])):
            if maps[i][j] == start:
                return i, j


def solution(maps):
    x1, y1 = find_start("S", maps)
    cost1 = bfs(x1, y1, maps, "L")
    print(cost1)
    x2, y2 = find_start("L", maps)
    cost2 = bfs(x2, y2, maps, "E")

    if cost1 != -1 and cost2 != -1:
        return cost1 + cost2
    else:
        return -1
