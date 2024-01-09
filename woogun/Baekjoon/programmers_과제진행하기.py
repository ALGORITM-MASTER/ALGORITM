from collections import deque


# 문자열 시간을 분으로 변경하는 함수
def transform_time(plans):
    for i in range(len(plans)):
        time = int(plans[i][1].split(":")[0]) * 60 + int(plans[i][1].split(":")[1])
        plans[i][1] = time
        plans[i][2] = int(plans[i][2])  # 문자열을 int로


def solution(plans):
    answer = []
    plans.sort(key=lambda x: x[1])  # 과제 시작시간으로 정렬
    transform_time(plans)  # 문자열 시간을 분으로 변경 ex) 11:40 => 700

    stack = []
    stack.append(plans[0])  # 첫 과제 초기화

    time = plans[0][1]  # 첫 과제 시작 시간

    for i in range(1, len(plans)):
        next_time = plans[i][1]

        while len(stack):
            print(stack)
            subject, start_time, spend_time = stack.pop()

            finish_time = time + spend_time  # 과제 끝나는 시간

            if time < start_time:
                time = start_time

            if next_time < finish_time:  # 다음 과제를 먼저 시작하면
                stack.append([subject, start_time, finish_time - next_time])  # 잠시 중단시키기
                time = next_time  # 다음 작업 시간
                break
            else:
                answer.append(subject)
                time += spend_time

        stack.append(plans[i])

    while stack:
        answer.append(stack.pop()[0])

    return answer
