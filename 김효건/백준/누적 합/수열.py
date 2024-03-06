import sys

n, m = map(int, sys.stdin.readline().split())
num = list(map(int, sys.stdin.readline().split()))
arr = [0]
add = 0
result = []

for i in range(n):
    add += num[i]
    arr.append(add)

for i in range(n+1-m):
    result.append(arr[i+m]-arr[i])

print(max(result))