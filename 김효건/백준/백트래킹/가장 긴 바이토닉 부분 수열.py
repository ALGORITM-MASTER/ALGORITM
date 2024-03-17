import sys

n = int(input())
num_list = list(map(int, sys.stdin.readline().split()))

front = [1] * n
back = [1] * n

for i in range(1,n):
    for j in range(i):
        if num_list[i] > num_list[j]:
            front[i] = max(front[j]+1, front[i])

for i in range(n-1, -1, -1):
    for j in range(i, n):
        if num_list[i] > num_list[j]:
            back[i] = max(back[j]+1, back[i])

aws_list = [0] * n
for i in range(n):
    aws_list[i] = front[i] + back[i]

print(max(aws_list) - 1)
