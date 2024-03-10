def solution(keymap, targets):
    answer = []

    key_dict = {}

    for key in keymap:
        for index, value in enumerate(key):

            if not value in key_dict:
                key_dict[value] = index + 1
                continue

            if key_dict[value] > index + 1:
                key_dict[value] = index + 1

    for target in targets:
        count = 0
        flag = False
        for t in target:
            if not t in key_dict:
                answer.append(-1)
                flag = True
                break
            count += key_dict[t]

        if not flag:
            answer.append(count)

    return answer
