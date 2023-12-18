function solution(sequence) {
  const ary1 = sequence.map((v, idx) => (idx % 2 ? v : -v));
  const ary2 = sequence.map((v, idx) => (idx % 2 ? -v : v));

  const dp1 = new Array(sequence.length);
  const maxDp1 = new Array(sequence.length);
  const dp2 = new Array(sequence.length);
  const maxDp2 = new Array(sequence.length);

  dp1[0] = ary1[0];
  dp2[0] = ary2[0];
  maxDp1[0] = ary1[0];
  maxDp2[0] = ary2[0];

  for (let i = 1; i < sequence.length; i++) {
    maxDp1[i] = Math.max(maxDp1[i - 1] + ary1[i], ary1[i]);
    maxDp2[i] = Math.max(maxDp2[i - 1] + ary2[i], ary2[i]);

    dp1[i] = Math.max(maxDp1[i], dp1[i - 1]);
    dp2[i] = Math.max(maxDp2[i], dp2[i - 1]);
  }

  return Math.max(dp1[dp1.length - 1], dp2[dp2.length - 1]);
}
