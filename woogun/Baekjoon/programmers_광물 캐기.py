def solution(picks, minerals):
    answer = 0

    # minerals 배열을 각 곡괭이가 캐는 광물 5개로 나누기
    minerals = minerals[:sum(picks)*5]
    minerals = [minerals[i:i+5] for i in range(0, len(minerals), 5)]

    costs = []
    # 각 광물을 캘 때 소모되는 피로도 계산
    for mineral in minerals:
        cost = [0, 0, 0]  # dia, iron, stone
        for mine in mineral:
            if mine == 'diamond':
                cost[0] += 1
                cost[1] += 5
                cost[2] += 25
            elif mine == 'iron':
                cost[0] += 1
                cost[1] += 1
                cost[2] += 5
            else:
                cost[0] += 1
                cost[1] += 1
                cost[2] += 1
        costs.append(cost)

    # 광물을 캘 때 필요한 피로도를 낮은 광물을 기준으로 정렬
    costs = sorted(costs, key=lambda x: (-x[2], -x[1]))

    # 각 광물을 캐는데 필요한 피로도를 고려하여 picks를 감소시키고 최소 피로도 계산
    for cost in costs:
        if picks[0] > 0:
            picks[0] -= 1
            answer += cost[0]
            continue
        elif picks[1] > 0:
            picks[1] -= 1
            answer += cost[1]
            continue
        elif picks[2] > 0:
            picks[2] -= 1
            answer += cost[2]
            continue

    return answer