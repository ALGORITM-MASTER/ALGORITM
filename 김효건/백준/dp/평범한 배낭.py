import sys

input = sys.stdin.readline

n, max_weight = map(int, input().split())
dp = [[0] * (max_weight+1) for _ in range(n+1)]
bag_list = [[0, 0]]

for _ in range(n):
    bag_list.append(list(map(int, input().split())))


for i in range(1, n+1):
    for j in range(1, max_weight+1):
        weight = bag_list[i][0]
        value = bag_list[i][1]

        if j < weight:
            dp[i][j] = dp[i-1][j]
        else:
            dp[i][j] = max(value+dp[i-1][j-weight], dp[i-1][j])

print(dp[n][max_weight])