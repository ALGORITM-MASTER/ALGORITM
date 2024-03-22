from collections import defaultdict


def calculate_gift_score(send_people, receive_people, gift_score):
    if gift_score[send_people] > gift_score[receive_people]:
        return 1
    else:
        return 0


def calculate_gift(send, receive, send_people, gift_score):
    total_score = 0

    for i in range(len(send[send_people])):
        send_score = send[send_people][i][1]
        receive_score = receive[send_people][i][1]

        receive_people = receive[send_people][i][0]

        if send_score == receive_score:
            total_score += calculate_gift_score(send_people, receive_people, gift_score)
        elif send_score > receive_score:
            total_score += 1

    return total_score


def solution(friends, gifts):
    send = {}
    receive = {}

    gift_score = defaultdict(int)
    max_gift = 0

    # 초기 준 사람 받은 사람 세팅
    for i in range(len(friends)):
        send[friends[i]] = []
        receive[friends[i]] = []
        for j in range(len(friends)):
            if i != j:
                send[friends[i]].append([friends[j], 0])
                receive[friends[i]].append([friends[j], 0])

    # 주고 받은 선물을 센다
    for gift in gifts:
        send_people = gift.split(" ")[0]
        receive_people = gift.split(" ")[1]

        for send_dict in send[send_people]:
            if send_dict[0] == receive_people:
                send_dict[1] += 1

        for receive_dict in receive[receive_people]:
            if receive_dict[0] == send_people:
                receive_dict[1] += 1

    # 선물 지수 계산
    for friend in friends:
        total_send = 0
        total_receive = 0

        for send_people in send[friend]:
            total_send += send_people[1]
        for receive_people in receive[friend]:
            total_receive += receive_people[1]

        gift_score[friend] = total_send - total_receive

    # 다음 달에 받는 선물 계산
    for i in range(len(friends)):
        total_score = calculate_gift(send, receive, friends[i], gift_score)
        max_gift = max(max_gift, total_score)

    return max_gift



