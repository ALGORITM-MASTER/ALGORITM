import sys

n = int(input())
juice = []

for i in range(n):
    juice.append(int(sys.stdin.readline()))
    

dp = [0] * n
dp[0] = juice[0]

if n == 1:
    print(juice[0])
elif n == 2:
    print(juice[0]+juice[1])
else:
    dp[1] = juice[0] + juice[1]
    dp[2] = max(juice[2] + juice[1], juice[2] + juice[0], dp[1])

    for i in range(3,n):
        dp[i] = max(dp[i-1], juice[i] + juice[i-1] + dp[i-3], juice[i] + dp[i-2])

    print(dp[n-1])