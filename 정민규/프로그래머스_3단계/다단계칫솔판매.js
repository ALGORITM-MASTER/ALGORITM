function solution(enroll, referral, seller, amount) {
  const graph = new Map();
  graph.set("-", { child: [], sell: 0, parent: null });

  for (let i = 0; i < enroll.length; i++) {
    const enrollName = enroll[i];
    const referralName = referral[i];

    graph.set(enrollName, { child: [], sell: 0, parent: referralName });
    graph.get(referralName).child.push(enrollName);
  }

  const calculateMoney = (name, money) => {
    const info = graph.get(name);

    const sendMoney = ~~(money / 10);
    info.sell += money - sendMoney;

    if (info.parent && sendMoney !== 0) calculateMoney(info.parent, sendMoney);
  };

  for (let i = 0; i < seller.length; i++) {
    const name = seller[i];
    const profit = amount[i];
    calculateMoney(name, profit * 100);
  }

  const ret = [];
  for (const [name, info] of graph) {
    if (name !== "-") ret.push(info.sell);
  }
  return ret;
}
