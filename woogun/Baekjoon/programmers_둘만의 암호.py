def word_mapper(char, index, skip):
    alpha = "abcdefghijklmnopqrstuvwxyz"
    target_index = alpha.index(char)
    new_word = ""

    while len(new_word) < index:
        target_index += 1

        if target_index > 25:
            target_index %= 26

        if alpha[target_index] not in skip:
            new_word += alpha[target_index]

    return new_word[-1]


def solution(s, skip, index):
    answer = ""

    for char in s:
        answer += word_mapper(char, index, skip)
    return answer