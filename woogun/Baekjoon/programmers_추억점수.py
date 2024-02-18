def solution(name, yearning, photo):
    answer = []

    dict = {}

    for i in range(len(name)):
        dict[name[i]] = yearning[i]

    for pho in photo:
        score = 0
        for people in pho:
            if people in name:
                score += dict[people]

        answer.append(score)

    return answer