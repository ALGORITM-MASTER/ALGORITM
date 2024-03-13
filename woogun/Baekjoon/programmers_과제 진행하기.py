from collections import deque


def solution(plans):
    answer = []

    for i in range(len(plans)):
        h, m = map(int, plans[i][1].split(':'))
        plans[i][1] = 60 * h + m
        plans[i][2] = int(plans[i][2])

    plans.sort(key=lambda x: x[1])
    count = 0
    q = deque()

    while (len(answer) != len(plans)):

        if (count == len(plans) - 1):  # 마지막까지 다 돌리고나면 남은 것 추가
            answer.append(plans[count][0])
            while q:
                answer.append(q.popleft()[0])
            continue
            # 만약 시간이 맞거나 남으면
        rest = plans[count + 1][1] - plans[count][1]

        if (rest >= plans[count][2]):  # 남은시간이 공부시간 보다 같거나, 클 경우
            answer.append(plans[count][0])
            rest -= plans[count][2]

            if len(q) == 0:
                count += 1
                continue

            while rest > 0 and len(q) > 0:
                if q[0][1] <= rest:
                    a, b = q.popleft()
                    answer.append(a)
                    rest -= b
                else:
                    q[0][1] -= rest
                    rest = 0
            count += 1
            # 만약 시간이 부족하면
        else:
            q.appendleft([plans[count][0], plans[count][2] - rest])
            count += 1

    return answer