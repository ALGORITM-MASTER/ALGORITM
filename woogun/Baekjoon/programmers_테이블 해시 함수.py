# 리스트 원소 xor 계산
def xor(s_list):
    result = 0

    for num in s_list:
        result ^= num
    return result


def solution(data, col, row_begin, row_end):
    answer = 0
    # 1단계 col번째 컬럼의 값을 기준으로 정렬, 값이 동일하면 첫번째 컬럼 내림차순 정렬
    data = sorted(data, key=lambda x: (x[col - 1], -x[0]))

    # 2단계 각 컬럼의 값을 row번째로 나눈 나머지 합을 정의
    s_list = []

    for row in range(row_begin - 1, row_end):
        temp = 0
        for num in data[row]:
            temp += num % (row + 1)
        s_list.append(temp)

    answer = xor(s_list)
    return answer
