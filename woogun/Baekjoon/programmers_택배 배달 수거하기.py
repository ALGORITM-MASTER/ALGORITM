# 최대한 먼 거리 부터 택배를 배달하고 수거하는 방식
# for문을 돌아서 처음 만나는 택배 또는 수거의 (전체 길이 - index) * 2가 한 번 왕복하는 길이
# 수거는 무조건 돌아가는 길에 하는게 좋다.
# for문을 돌았을 때 택배를 먼저 만나는지 수거를 먼저 만나는지 정해야한다.
# 택배를 먼저 만난다. -> for문을 거꾸로 돌며 cap이 가득 찰 때 까지 배달한다. 돌아가는 길에 수거하므로 cap이 가득 찰 때 까지 수거한다.
# 수거를 먼저 만난다. -> for문을 거꾸로 돌며 cap이 가득 찰 때 까지 수거한다. cap이 가득찰 때 까지 배달한다.
# -> 배달용 cap, 수거용 cap 따로 저장


def solution(cap, n, deliveries, pickups):
    # 가장 멀리 있는 곳 부터 시작해야하므로 배열 뒤집기
    deliveries.reverse()
    pickups.reverse()
    answer = 0

    # 택배 또는 수거가 있는지
    delivery = 0
    pickup = 0

    for i in range(n):
        delivery += deliveries[i]
        pickup += pickups[i]
        print("i : {}".format(i))
        # 택배 또는 수거가 있다면
        while delivery > 0 or pickup > 0:
            delivery -= cap
            pickup -= cap
            # 그 거리 만큼 왔다갔다 해야함
            answer += n - i

    return answer * 2




