import sys

n = int(input())
num_list = []
dp = [1] * n

for i in range(n):
    num_list.append(list(map(int, sys.stdin.readline().split())))

num_list.sort()

for i in range(1,n):
    for j in range(i):
        if num_list[j][1] < num_list[i][1]:
            dp[i] = max(dp[i], dp[j] + 1)
            
print(n-max(dp))