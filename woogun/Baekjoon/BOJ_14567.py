# https://www.acmicpc.net/problem/14567
# 백준 14567 선수과목
# 위상 정렬 알고리즘을 이용한 풀이

import sys
from collections import deque
input = sys.stdin.readline


def topological_sorting(que):
    while que:
        node, count = que.popleft()

        for next_node in graph[node]:
            degree[next_node] -= 1 # 해당 노드와 연결된 간선 제거

            if degree[next_node] == 0: # 진입차수가 0이되면 que에 삽입
                que.append((next_node, count + 1))
                answer[next_node] = count + 1


N, M = map(int, input().split()) # 과목의 수, 선수 과목의 수
degree = [0] * (N+1) # 진입 차수를 담는 리스트
graph = [[] for _ in range(N+1)] # 정점을 담는 리스트
answer = [0] * (N+1) # 출력 정답을 담는 리스트

for i in range(M):
    subject1, subject2 = map(int, input().split())
    graph[subject1].append(subject2) # 단방향 그래프 세팅
    degree[subject2] += 1 # 진입차수 세팅

que = deque()

# 진입 차수가 0인 정점이면 que에 넣는다.
for i in range(1, len(degree)):
    if degree[i] == 0:
        answer[i] = 1
        que.append((i, 1)) # 차수가 0인 정점, 몇번째 과목인지

topological_sorting(que) # 위상 정렬 시작

answer = answer[1:]
print(*answer)