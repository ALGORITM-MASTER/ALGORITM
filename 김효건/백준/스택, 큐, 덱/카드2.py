# n = int(input())

# card = [i+1 for i in range(n)]   # 카드를 1~n번까지 담는다.

# while(len(card) != 1):      # 카드가 1장이 될 때까지 가장 앞의 카드는 버린뒤, 그 다음 카드를 맨 뒤로 배치
#     card.pop(0)
#     card.append(card.pop(0))
#     print(card)

# print(card)   # -> 시간초과


n = int(input())
standard = 1

while 2**standard < n:
    standard += 1
    
if n == 1:
    print(1)

elif 2**standard == n:
    print(n)

else:
    print(2*(n-2**(standard-1)))
