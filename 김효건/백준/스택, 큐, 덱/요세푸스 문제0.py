num, step = map(int, input().split())

list = [i for i in range(1, num+1)]
answer = "<"
index = 0

while(list):
    index += step -1

    if index >= len(list):
        index %= len(list)

    answer += str(list.pop(index)) + ', '

print(answer[:-2] + ">")

