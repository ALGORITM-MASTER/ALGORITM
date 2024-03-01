# 실패한 코드 (시간 초과)

num = 0
num_list = []
visited = []
result = []

count = 0
flag = False


def backTracking(depth, k):
    global count, flag

    if depth == num:
        count += 1

        if count == k:
            flag = True

        return

    for index in range(len(num_list)):
        if not visited[index] and not flag:
            visited[index] = True
            result.append(num_list[index])

            backTracking(depth + 1, k)

            if flag:
                return

            result.pop()
            visited[index] = False


def solution(n, k):
    global num, num_list, visited
    num = n
    num_list = [i for i in range(1, num + 1)]
    visited = [False] * num

    backTracking(0, k)

    return result

# 성공 코드
def factorial(n):
    if n < 1:
        return 1
    else:
        return n * factorial(n - 1)


def solution(n, k):
    result = []
    num_list = [i for i in range(1, n + 1)]

    while (n != 0):
        num_case = factorial(n - 1)
        index = k // num_case

        k = k % num_case
        n -= 1

        if k == 0:
            result.append(num_list.pop(index - 1))
        else:
            result.append(num_list.pop(index))

    return result