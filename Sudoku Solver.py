a = [[1,2,3,4,5,6,7,8,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0]]


def box_finder(i,j):
    if i < 3:
        if j < 3:   return 0
        elif j < 6: return 1
        else:       return 2
    elif i < 6:
        if j < 3:   return 3
        elif j < 6: return 4
        else:       return 5
    else:
        if j < 3:   return 6
        elif j < 6: return 7
        else:       return 8

def dictionary_creater(a):
    row = [{},{},{},{},{},{},{},{},{}]
    column = [{},{},{},{},{},{},{},{},{}]
    box = [{},{},{}, {},{},{},{},{},{}]

    for i in range(9):
        for j in range(9):
            if a[i][j] != 0:
                row[i][a[i][j]] = 1
                column[j][a[i][j]] = 1
                box[box_finder(i,j)][a[i][j]] = 1

    return row,column,box

def sudoku(a,row,column,box,i = 0,j = 0):
    if i == 0 and j == 0 and row[i][a[i][j]] == 1:
        if len(row[i]) == 9:
            x = 0
            while a[i + 1][j + x] != 0:
                x += 1
            c = sudoku(a, row, column, box, i + 1, j)
            if c != False:
                return c
    for number in range(1,10):
        box_number = box_finder(i,j)
        if number not in row[i] and number not in column[j] and number not in box[box_number]:
            if i == 0 and j == 0 and row[i][a[i][j]] == 1:
                pass
            else:
                a[i][j] = number
                row[i][number] = 0
                column[j][number] = 0
                box[box_number][number] = 0
            if i == 8 and j == 8:
                return a
            elif j == 8:
                x = 0
                while a[i+1][x] != 0:
                    x += 1
                c = sudoku(a,row,column,box,i+1,x)
                if c != False:
                    return c
            else:
                x = 1
                while a[i][j+x] != 0:
                    x += 1
                    if (j + x) > 8:
                        j = 0
                        i += 1
                        x = 0
                c = sudoku(a,row,column,box,i,j+x)
                if c != False:
                    return c

    deletion(i,j,row,column,a,box)
    return False

def deletion(i,j,row,column,a,box):
    d = i
    b = j
    if b == 0:
        d -= 1
        b = 8
        x = 0
        key = a[d][b]
        while row[d][key] == 1:
            x += 1
            key = a[d][b - x]
        b -= x
    else:
        x = 1
        key = a[d][b - x]
        while row[d][key] == 1:
            x += 1
            key = a[i][j - x]
        b -= x

    box_number = box_finder(d,b)
    key = a[d][b]


    del row[d][key]
    del column[b][key]
    del box[box_number][key]
    a[d][b] = 0


def solve(a):
    row,column,box = dictionary_creater(a)

    final = sudoku(a,row,column,box)
    return final

print(solve(a))