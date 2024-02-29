import sys

n = int(input())
dp = [1] * n

arr = list(map(int, sys.stdin.readline().split()))

for i in range(1,n):
    for j in range(i):
        if arr[i] > arr[j]:
            dp[i] = max(dp[j]+1, dp[i])

print(max(dp))