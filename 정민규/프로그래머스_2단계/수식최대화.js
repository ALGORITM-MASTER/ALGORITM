function solution(expression) {
  const operatorOrderLst = ["*+-", "*-+", "+-*", "+*-", "-+*", "-*+"];

  const numLst = expression.match(/[^-*+]+/g).map((v) => +v);
  const operatorLst = expression.match(/[-*+]/g);

  const calculate = (a, b, op) => {
    switch (op) {
      case "*":
        return a * b;
      case "-":
        return a - b;
      case "+":
        return a + b;
    }
  };

  let ret = 0;
  for (const operatorOrder of operatorOrderLst) {
    let tmpNum = [...numLst];
    let tmpOperator = [...operatorLst];

    for (const operator of operatorOrder) {
      let operatorInfo = tmpOperator
        .map((v, idx) => (v === operator ? idx : null))
        .filter((v) => v !== null);

      for (let i = 0; i < tmpNum.length; i++) {
        if (operatorInfo.includes(i)) {
          tmpNum[i] = calculate(tmpNum[i], tmpNum[i + 1], operator);
          tmpNum = tmpNum.filter((v, idx) => idx !== i + 1);
          operatorInfo = operatorInfo.map((v) => v - 1);
          i--;
        }
      }

      tmpOperator = tmpOperator.filter((v) => v !== operator);
    }

    ret = Math.max(ret, Math.abs(tmpNum[0]));
  }

  return ret;
}
