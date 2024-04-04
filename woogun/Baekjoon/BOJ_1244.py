# https://www.acmicpc.net/problem/1244
# 백준 1244 스위치 켜고 끄기
# 단순 구현 문제
# 남자일 때 여자일 때를 구분하여 구현


# 스위치를 바꾸는 함수
def change_switch(num_list):
    for num in num_list:
        if switch[num] == 0:
            switch[num] = 1
        else:
            switch[num] = 0


N = int(input()) # 스위치 갯수
switch = [-1] + list(map(int, input().split())) # 스위치 리스트

student_num = int(input())
# info[n][0]이 1이면 남자, 2면 여자
info_list = [list(map(int, input().split())) for _ in range(student_num)]

for info in info_list:
    temp = []
    num = info[1]

    if info[0] == 1: # 남학생이면
        temp_num = 1
        while num * temp_num <= N: # 숫자의 배수만큼 리스트에 담기
            temp.append(num * temp_num)
            temp_num += 1
    else: # 여학생이면
        temp.append(num)

        temp_num = 1

        while num - temp_num > 0 and num + temp_num <= N: # 해당 숫자의 좌우가 리스트의 범위 안이면
            # 좌우 대칭인지 체크
            if switch[num - temp_num] == switch[num + temp_num]: # 좌우 대칭이면
                temp.append(num - temp_num) # 리스트에 넣기
                temp.append(num + temp_num)
                temp_num += 1 # 체크 범위 1 증가
            else : # 좌우 대칭이 아니면 탈출
                break

    change_switch(temp)

for index in range(1, N + 1):
    print(switch[index], end=" ")
    if index % 20 == 0:
        print()
