// 测试代码
// 借助系统栈实现一个表达式计算

/**
 *
 * @param str 表达式
 * @param l 左下标
 * @param r 右下标
 */
const calculator = (str: string, l: number, r: number): number => {
  // 游标，极值，权重
  let pos = -1,
    pri = Number.MAX_SAFE_INTEGER - 1,
    vt = 0;

  for (let i = l; i <= r; i++) {
    let cur = Number.MAX_SAFE_INTEGER;

    switch (str[i]) {
      case "+":
      case "-":
        cur = vt + 1;
        break;
      case "*":
      case "/":
        cur = vt + 2;
        break;
    }
    if (cur <= pri) {
      pos = i;
      pri = cur;
    }
  }

  console.log("pos", pos);

  if (pos === -1) {
    return parseInt(str[str.length - 1]);
  }

  let a = calculator(str, l, pos - 1);
  let b = calculator(str, pos + 1, r);

  switch (str[pos]) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      // TODO: b === 0?
      return a / b;
  }

  return 0;
};

const str = "3+4+5";

export const run = () => {
  const result = calculator(str, 0, str.length - 1);
  console.log("result:", result);
};
