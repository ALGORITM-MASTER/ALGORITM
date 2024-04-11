# https://www.acmicpc.net/problem/1916
# 백준 최소비용 구하기
# 우선순위 큐를 이용한 다익스트라 알고리즘 풀이

import heapq as hq
import sys

input = sys.stdin.readline


def dijkstra(depart):
    distance[depart] = 0
    que = []
    hq.heappush(que, (0, depart)) # 시작 정점의 거리를 0으로 초기화

    while que:
        dist, now = hq.heappop(que)

        if distance[now] < dist:  # 현재 정점의 거리보다 들어온 거리가 크다면 갱신 필요x
            continue

        for next_node in graph[now]: # 현재 정점과 연결되어있는 정점 탐색
            if dist + next_node[1] < distance[next_node[0]]: # 다음 정점의 거리보다 작아지면 갱신
                distance[next_node[0]] = dist + next_node[1]
                hq.heappush(que, (dist + next_node[1], next_node[0]))

            if now == destination:
                return

N = int(input()) # 도시의 갯수
M = int(input()) # 버스의 갯수

graph = [[] for _ in range(N+1)]

for i in range(M):
    start, end, cost = map(int, input().split())
    graph[start].append([end, cost])

# 출발지, 도착지
depart, destination = map(int, input().split())

INF = 1e9
distance = [INF] * (N+1) # 각 정점의 거리를 무한대로 초기화

dijkstra(depart)

print(distance[destination])

