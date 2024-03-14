# 소수 자리에는 무조건 1임 (1제외)
# 소수가 아닌 자리에는 가장 작은 약수로 나눈 값이 답임 (천만 까지)

def solution(begin, end):
    answer = []

    for i in range(begin, end + 1):
        min_num = 1
        max_num = 1

        for j in range(2, int(i ** 0.5) + 1):
            if i % j == 0:
                if i // j <= 10000000:
                    min_num = j
                    answer.append(i // j)
                    break
                else:
                    max_num = j

        if i == 1:
            answer.append(0)
        elif min_num == 1:
            # 소수
            print(max_num)
            answer.append(max_num)
    return answer