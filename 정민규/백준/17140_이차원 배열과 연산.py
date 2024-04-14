R,C,K = map(int,input().split())

ary = [ list(map(int,input().split())) for i in range(3)]


def customSort(ary):
    ary = filter(lambda x: x!=0,ary)
    dic = {}
    for i in ary:
        if i in dic:
            dic[i]+=1
        else :
            dic[i] = 1
    order = []
    for key,val in dic.items():
        order.append([key,val])
    order.sort(key=lambda x: x[0])
    order.sort(key=lambda x : x[1])
    ret = []
    for k,v in order:
        ret.append(k)
        ret.append(v)
    return ret



def rCalculation(ary):
    tmp = []
    size = 0
    
    for i in range(len(ary)):
        tmp.append(customSort(ary[i]))
        tmpSize = len(tmp[-1])

        if(tmpSize>size):
            size = tmpSize
    for part in tmp:
        for i in range(size-len(part)):
            part.append(0)
    return tmp

def rotateAry(ary):
    tmp = []
    for i in range(len(ary[0])):
        line = []
        for j in range(len(ary)):
            line.append(ary[j][i])
        tmp.append(line)
    return tmp


def cCalculation(ary):
    
    tmp = rotateAry(ary)
    tmp = rCalculation(tmp)
    return rotateAry(tmp)
    

for time in range(101):
    if R<len(ary) and C<len(ary[0]) and ary[R-1][C-1] == K:
        print(time)
        break
    
    if len(ary[0])>len(ary):
        ary = cCalculation(ary)
    else:
        ary = rCalculation(ary)
    
else:
    print(-1)