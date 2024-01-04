# https://www.acmicpc.net/problem/5639
# 백준 5639 이진 검색 트리

import sys
sys.setrecursionlimit(10 ** 9)
input = sys.stdin.readline

input_list = []

while True:
    try:
        input_list.append(int(input()))
    except:
        break


def post_order(start, end):
    if start > end:
        return

    root = input_list[start]
    mid = end + 1 # 오른쪽 노드가 없는 경우 파악

    for i in range(start + 1, end + 1):
        if root < input_list[i]:
            mid = i
            break

    post_order(start + 1, mid - 1) # 왼쪽 노드 탐색
    post_order(mid, end)           # 오른쪽 노드 탐색
    print(input_list[start])       # 루트 노드 출력


post_order(0, len(input_list) - 1)