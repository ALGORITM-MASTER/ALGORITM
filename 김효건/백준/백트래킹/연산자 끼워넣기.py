import sys

n = int(input())

num_list = list(map(int, sys.stdin.readline().split()))
add, sub, mul, div = map(int, sys.stdin.readline().split())

# 처음 들어오는 num_list[0]이 최대값이 되도록 설정
aws_max = -1e9
# 처음 들어오는 num_list[0]이 최소값이 되도록 설정
aws_min= 1e9


def dfs(idx, value, add, sub, mul, div):
    global aws_max, aws_min

    if idx == n:
        aws_max = max(value, aws_max)
        aws_min = min(value, aws_min)
        return
    
    if add:
        dfs(idx + 1, value + num_list[idx], add-1, sub, mul, div)
    
    if sub:
        dfs(idx + 1, value - num_list[idx], add, sub-1, mul, div)

    if mul:
        dfs(idx + 1, value * num_list[idx], add, sub, mul-1, div)

    if div:
        dfs(idx + 1, int(value / num_list[idx]), add, sub, mul, div-1)

dfs(1, num_list[0], add, sub, mul, div)
print(aws_max)
print(aws_min)