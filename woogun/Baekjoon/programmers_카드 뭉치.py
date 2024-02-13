from collections import deque

def solution(cards1, cards2, goal):
    answer = "Yes"
    # cards1과 cards2를 que로 변환
    cards1 = deque(cards1)
    cards2 = deque(cards2)

    for word in goal:
        if cards1 and word in cards1[0]:
            cards1.popleft()
            continue

        if cards2 and word in cards2[0]:
            cards2.popleft()
            continue

        answer = "No"
        break

    return answer




