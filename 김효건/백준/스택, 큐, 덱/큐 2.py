import sys
from collections import deque

n = int(input())
queue = deque()
input = sys.stdin.readline

for i in range(n):
    # command = list(map(str, input().split()))
    command = input().split()

    if command[0] == 'push':
        queue.append(int(command[1]))
    
    elif command[0] == 'front':
        if len(queue) == 0:
            print(-1)
        else:
            print(queue[0])

    elif command[0] == 'back':
        if len(queue) == 0:
            print(-1)
        else:
            print(queue[-1])

    elif command[0] == 'size':
        print(len(queue))

    elif command[0] == 'empty':
        print(1) if len(queue) == 0 else print(0)

    elif command[0] == 'pop':
        if len(queue) == 0:
            print(-1)
        else:
            print(queue.popleft())

