import sys
import heapq as hp

n = int(input())
heap = []

for i in range(n):
    num = int(sys.stdin.readline())

    if num:
        hp.heappush(heap, num)

    else:
        if heap:
            print(hp.heappop(heap))
        else:
            print(0)