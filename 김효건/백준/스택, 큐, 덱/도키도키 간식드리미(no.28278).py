n = int(input())
question = list(map(int, input().split()))

stack = []
num = 1

while question:
    if question[0] == num:
        question.pop(0)
        num += 1
    else:
      stack.append(question.pop(0))

    while stack and stack[-1] == num:
       stack.pop()
       num += 1

if stack:
   print("Sad")
else:
   print("Nice")
