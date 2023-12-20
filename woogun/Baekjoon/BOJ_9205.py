# https://www.acmicpc.net/problem/9205
# 백준 9205 맥주 마시면서 걸어가기

# 50m를 거리 1이라고 생각
# 한번에 거리를 최대 1000까지 이동할 수 있다.
# bfs로 집 -> 편의점 -> 페스티벌까지 갈 수 있는지 확인

from collections import deque

def bfs():
    global answer
    que = deque()
    que.append((house[0], house[1]))

    while que:
        x, y = que.popleft()

        if abs(x - festival[0]) + abs(y - festival[1]) <= 1000:
            answer = "happy"
            return

        for i in range(n):
            # 편의점을 방문하지 않았다면 방문
            if not visited[i]:
                new_x, new_y = convenience_store[i]
                if abs(x - new_x) + abs(y - new_y) <= 1000:
                    visited[i] = True
                    que.append((new_x, new_y))

    answer = "sad"

t = int(input())

for tc in range(t):
    n = int(input()) # 편의점의 갯수

    house = list(map(int, input().split()))
    convenience_store = [list(map(int, input().split())) for _ in range(n)]
    festival = list(map(int, input().split()))
    answer = ""

    visited = [False] * n
    bfs()

    print(answer)