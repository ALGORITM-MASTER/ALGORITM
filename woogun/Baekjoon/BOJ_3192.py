# https://www.acmicpc.net/problem/3192
# 백준 매직스퀘어
# 3개의 행, 3개의 열, 두 대각선을 모두 탐색하여 세 수의 총합을 구한다.
# 3개의 행, 3개의 열, 두 대각선을 모두 탐색하여 0이 한 개일 때 숫자를 채워넣는다.

# 세 수의 합을 찾는 함수
def find_total_number():
    # 3개의 행을 탐색
    for i in range(3):
        count = 0
        temp_num = 0
        for j in range(3):
            if square[i][j] == 0: # 숫자가 지워져 있으면 break
                break
            temp_num += square[i][j]
            count += 1

        # 세 수를 모두 더했다면 나머지는 탐색할 필요가 없으므로 return
        if count == 3:
            return temp_num

    # 3개의 열을 탐색
    for i in range(3):
        temp_num = 0
        count = 0
        for j in range(3):
            if square[j][i] == 0:
                break
            temp_num += square[j][i]
            count += 1

        if count == 3:
            return temp_num

    # 대각선 탐색
    count = 0
    temp_num = 0
    for i in range(3):
        if square[i][i] == 0:
            break
        temp_num += square[i][i]
        count += 1

    if count == 3:
        return temp_num

    # 역 대각선 탐색
    count = 0
    temp_num = 0
    for i in range(3):
        if square[i][dict[i]] == 0:
            break
        temp_num += square[i][dict[i]]
        count += 1

    if count == 3:
        return temp_num

    return 0

# 지워진 숫자 채워넣기
def fill_number():
    x, y = 0, 0
    # 3개의 행 탐색
    for i in range(3):
        temp = []
        for j in range(3):
            if square[i][j] != 0:
                temp.append(square[i][j])
            else:
               x, y = i, j

        # 한 행의 탐색이 끝났을 때 temp의 길이가 2이면 나머지 1개의 숫자를 채울 수 있다.
        if len(temp) == 2 and j == 2:
            number = total_num - sum(temp)
            square[x][y] = number


    x, y = 0, 0
    # 3개의 열 탐색
    for i in range(3):
        temp = []
        for j in range(3):
            if square[j][i] != 0:
                temp.append(square[j][i])
            else:
                x, y = j, i

        # 한 행의 탐색이 끝났을 때 temp의 길이가 2이면 나머지 1개의 숫자를 채울 수 있다.
        if len(temp) == 2 and j == 2:
            number = total_num - sum(temp)
            square[x][y] = number


    x, y = 0, 0
    temp = []
    # 대각선 탐색
    for i in range(3):
        if square[i][i] != 0:
            temp.append(square[i][i])
        else:
            x, y = i, i
    if len(temp) == 2:
        number = total_num - sum(temp)
        square[x][y] = number


    x, y = 0, 0
    temp = []
    # 역대각선 탐색
    for i in range(3):
        if square[i][dict[i]] != 0:
            temp.append(square[i][dict[i]])
        else:
            x, y = i, dict[i]
    if len(temp) == 2:
        number = total_num - sum(temp)
        square[x][y] = number



square = [list(map(int, input().split())) for _ in range(3)]

dict = {
        0 : 2,
        1 : 1,
        2 : 0
    }

total_num = find_total_number()
fill_number()

for answer in square:
    for ans in answer:
        print(ans, end = " ")
    print()
