import sys

input = sys.stdin.readline
n = int(input())
aws = []

n1 = list(map(int, input().split()))
n1.sort()

m = int(input())
m1 = list(map(int, input().split()))

dic = {}

for i in n1:
    if i in dic:
        dic[i] += 1
    else:
        dic[i] = 1

for j in m1:
    if j in dic:
        print(dic[j], end = ' ')
    else:
        print('0', end = ' ')