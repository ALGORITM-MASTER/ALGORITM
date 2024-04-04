import heapq as hq


def solution(n, k, enemy):
    answer = 0
    heap = []
    sum_enemy = 0
    # 무적권으로 모든 병사를 막을 수 있으면
    if k == len(enemy):
        return k

    for e in enemy:
        hq.heappush(heap, (-e, e))  # 음수로 넣으면 최대힙 형태
        sum_enemy += e

        if sum_enemy > n:
            if k == 0:
                break
            k -= 1
            sum_enemy += hq.heappop(heap)[0]  # 현재 누적된 적에서 무적권을 사용했으므로 현재 적을 뺴줌

        answer += 1
    return answer


