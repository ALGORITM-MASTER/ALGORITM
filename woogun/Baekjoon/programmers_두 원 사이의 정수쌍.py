import math


def count_1(r1, r2):
    count = 0

    for x in range(0, r1):
        count += int(math.sqrt(r2 ** 2 - x ** 2)) - int(math.sqrt(r1 ** 2 - x ** 2 - 1))

    for x in range(r1, r2):
        count += int(math.sqrt(r2 ** 2 - x ** 2))

    return count


def solution(r1, r2):
    return count_1(r1, r2) * 4
