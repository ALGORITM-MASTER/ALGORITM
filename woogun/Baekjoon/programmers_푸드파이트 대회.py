# 두 사람이 같은 양의 음식을 먹어야 하므로 음식은 항상 짝수 여야만 한다.
# 만약 음식이 홀수일 경우 1개를 버려야 한다.

def odd_even(num):
    if num % 2 != 0:
        return "odd"
    else:
        return "even"

def solution(food):
    answer = ''
    
    # food 재설정: 홀수일 때는 1개 버리기
    for i in range(1, len(food)):
        if odd_even(food[i]) == "odd":
            food[i] -= 1
    
    # 왼쪽 선수 음식 채우기
    for i in range(1, len(food)):
        answer += str(i) * (food[i] // 2) 
    
    # 물 채우기
    answer += "0"
    
    #오른쪽 선수 음식 채우기
    for i in range(len(food) - 1, 0, -1):
        answer += str(i) * (food[i] // 2)
        
    return answer
    
    