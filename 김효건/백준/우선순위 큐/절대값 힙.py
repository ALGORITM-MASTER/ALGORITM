import sys
import heapq as hp

n = int(input())
heap = []

for i in range(n):
    num = int(sys.stdin.readline())
    if num:
        hp.heappush(heap, (abs(num), num))
    
    else:
        if heap:
             print(hp.heappop(heap)[1])
        else: print(0)


