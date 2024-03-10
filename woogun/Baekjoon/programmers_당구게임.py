# 대칭이동을 이용한 최단 거리

def cushion(x, y, startX, startY, ballX, ballY):
    dist_list = []

    # 왼쪽 벽
    # 두 공이 Y가 같은 라인에 있고 적구가 왼쪽에 있으면 벽을 못침
    if not (ballY == startY and ballX < startX):
        # startX가 + 인 이유는 왼쪽 축을 기준으로 Y축 대칭 이동을 했기 때문임
        dist = (ballX + startX) ** 2 + (ballY - startY) ** 2
        dist_list.append(dist)

    # 오른쪽 벽
    if not (ballY == startY and ballX > startX):
        # 오른쪽 벽은 축이 없으므로 x2를 통해 축을 만들고 계산
        dist = (ballX - 2 * x + startX) ** 2 + (ballY - startY) ** 2
        dist_list.append(dist)

    # 위쪽 벽
    if not (ballX == startX and ballY > startY):
        dist = (ballX - startX) ** 2 + (ballY - 2 * y + startY) ** 2
        dist_list.append(dist)

    # 아래쪽 벽
    if not (ballX == startX and ballY < startY):
        dist = (ballX - startX) ** 2 + (ballY + startY) ** 2
        dist_list.append(dist)

    return min(dist_list)


def solution(m, n, startX, startY, balls):
    answer = []

    for ball in balls:
        distance = cushion(m, n, startX, startY, ball[0], ball[1])
        answer.append(distance)

    return answer


