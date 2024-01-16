from collections import Counter


def solution(weights):
    answer = 0

    weights_count = Counter(weights)  # 몸무게가 같은 사람 찾기

    for key, value in weights_count.items():
        if value > 1:
            answer += value * (value - 1) // 2

    # 몸무게가 같은 사람을 모두 찾았으면 중복 제거
    weights = list(set(weights))

    # 두 사람의 무게가 다를 경우 떨어져 앉는 거리의 경우의 수: (2, 3), (2, 4), (3, 4)
    for weight in weights:
        # 2:3 비율
        if weight * 2 / 3 in weights:
            answer += weights_count[weight * 2 / 3] * weights_count[weight]
        # 2:4 비율
        if weight * 2 / 4 in weights:
            answer += weights_count[weight * 2 / 4] * weights_count[weight]
        # 3:4 비율
        if weight * 3 / 4 in weights:
            answer += weights_count[weight * 3 / 4] * weights_count[weight]

    return answer