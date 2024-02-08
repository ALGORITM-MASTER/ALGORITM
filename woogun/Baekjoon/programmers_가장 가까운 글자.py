def solution(s):
    answer = []

    for index, value in enumerate(s):
        # 맨 처음 글자는 무적권 -1
        if not answer:
            answer.append(-1)
            continue

        count = 1         # 몇 칸 앞에 있는지
        target = s[index] # 현재 위치
        flag = False      # 앞에 같은 글자가 있는지 없는지 확인

        for index2 in range(index - 1, -1, -1):
            if s[index2] == target:
                answer.append(count)
                flag = True
                break

            count += 1

        if not flag: # 2중 for문을 다 돌았지만 같은 글자는 없었음
            answer.append(-1)

    return answer