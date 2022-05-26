var _pj;

var a;

function _pj_snippets(container) {
  function in_es6(left, right) {
    if (right instanceof Array || typeof right === "string") {
      return right.indexOf(left) > -1;
    } else {
      if (
        right instanceof Map ||
        right instanceof Set ||
        right instanceof WeakMap ||
        right instanceof WeakSet
      ) {
        return right.has(left);
      } else {
        return left in right;
      }
    }
  }

  container["in_es6"] = in_es6;
  return container;
}

_pj = {};

_pj_snippets(_pj);

a = [
  [1, 2, 3, 4, 5, 6, 7, 8, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function box_finder(i, j) {
  if (i < 3) {
    if (j < 3) {
      return 0;
    } else {
      if (j < 6) {
        return 1;
      } else {
        return 2;
      }
    }
  } else {
    if (i < 6) {
      if (j < 3) {
        return 3;
      } else {
        if (j < 6) {
          return 4;
        } else {
          return 5;
        }
      }
    } else {
      if (j < 3) {
        return 6;
      } else {
        if (j < 6) {
          return 7;
        } else {
          return 8;
        }
      }
    }
  }
}

function dictionary_creater(a) {
  var box, column, row;
  row = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  column = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  box = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  for (var i = 0, _pj_a = 9; i < _pj_a; i += 1) {
    for (var j = 0, _pj_b = 9; j < _pj_b; j += 1) {
      if (a[i][j] !== 0) {
        row[i][a[i][j]] = 1;
        column[j][a[i][j]] = 1;
        box[box_finder(i, j)][a[i][j]] = 1;
      }
    }
  }

  return [row, column, box];
}

function sudoku(a, row, column, box, i = 0, j = 0) {
  var box_number, c, x;

  if (i === 0 && j === 0 && row[i][a[i][j]] === 1) {
    if (row[i].length === 9) {
      x = 0;

      while (a[i + 1][j + x] !== 0) {
        x += 1;
      }

      c = sudoku(a, row, column, box, i + 1, j);

      if (c !== false) {
        return c;
      }
    }
  }

  for (var number = 1, _pj_a = 10; number < _pj_a; number += 1) {
    box_number = box_finder(i, j);

    if (
      !_pj.in_es6(number, row[i]) &&
      !_pj.in_es6(number, column[j]) &&
      !_pj.in_es6(number, box[box_number])
    ) {
      if (i === 0 && j === 0 && row[i][a[i][j]] === 1) {
      } else {
        a[i][j] = number;
        row[i][number] = 0;
        column[j][number] = 0;
        box[box_number][number] = 0;
      }

      if (i === 8 && j === 8) {
        return a;
      } else {
        if (j === 8) {
          x = 0;

          while (a[i + 1][x] !== 0) {
            x += 1;
          }

          c = sudoku(a, row, column, box, i + 1, x);

          if (c !== false) {
            return c;
          }
        } else {
          x = 1;

          while (a[i][j + x] !== 0) {
            x += 1;

            if (j + x > 8) {
              j = 0;
              i += 1;
              x = 0;
            }
          }

          c = sudoku(a, row, column, box, i, j + x);

          if (c !== false) {
            return c;
          }
        }
      }
    }
  }

  deletion(i, j, row, column, a, box);
  return false;
}

function deletion(i, j, row, column, a, box) {
  var b, box_number, d, key, x;
  d = i;
  b = j;

  if (b === 0) {
    d -= 1;
    b = 8;
    x = 0;
    key = a[d][b];

    while (row[d][key] === 1) {
      x += 1;
      key = a[d][b - x];
    }

    b -= x;
  } else {
    x = 1;
    key = a[d][b - x];

    while (row[d][key] === 1) {
      x += 1;
      key = a[i][j - x];
    }

    b -= x;
  }

  box_number = box_finder(d, b);
  key = a[d][b];
  delete row[d][key];
  delete column[b][key];
  delete box[box_number][key];
  a[d][b] = 0;
}

function solve(a) {
  var box, column, final1, row;
  [row, column, box] = dictionary_creater(a);
  return sudoku(a, row, column, box);
}

document.querySelector(".solve").addEventListener("click", function () {
  var input_array = document.getElementsByName("val");
  var a = [];
  var b = [];
  let x = 0;
  for (i = 0; i < input_array.length; i++) {
    b.push(Number(input_array[i].value));
    x = x + 1;
    if (x % 9 === 0) {
      a.push(b);
      b = [];
    }
  }
  solve(a);
  console.log(a);
  for (i = 0; i < input_array.length; i++) {
    input_array[i].value = a[(i - (i % 9)) / 9][i % 9];
  }
});
