discount_rate = [10, 20, 30, 40]
stack = []
size = 0
max_plus = 0
max_price = 0

result = []


# 할인율의 경우의 수를 모두 뽑음
def permutation(depth, emoticons, users):
    global size

    if depth == size:
        discount_emoticons(emoticons, users)
        return

    for discount in discount_rate:
        stack.append(discount)
        permutation(depth + 1, emoticons, users)
        stack.pop()


# 재귀로 뽑은 할인율 경우의 수를 바탕으로 이모티콘 할인 적용
def discount_emoticons(emoticons, users):
    global max_plus, max_price, size

    discount_emo = []

    for index, emo in enumerate(emoticons):
        emo = (emo // 10) * ((100 - stack[index]) // 10)
        discount_emo.append(emo)

    buy_emoticons(users, discount_emo)


# 이모티콘을 구매하여 플러스에 가입할지 말지 정함
def buy_emoticons(users, emoticons):
    total_plus = 0
    total_price = 0

    for user in users:
        price = 0
        for index, emo_price in enumerate(emoticons):
            if stack[index] >= user[0]:
                price += emo_price

        if price >= user[1]:
            total_plus += 1
        else:
            total_price += price

    result.append([total_plus, total_price])


def solution(users, emoticons):
    global max_plus, max_price, size, result
    size = len(emoticons)

    permutation(0, emoticons, users)

    result = sorted(result, key=lambda x: (-x[0], -x[1]))

    return result[0]
