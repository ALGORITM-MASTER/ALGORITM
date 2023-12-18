function solution(files) {
  const fileInfo = files.map((file) => {
    const v = file;
    file = file.toLowerCase();
    let num = file.match(/[0-9]+/);
    if (num) num = num[0];

    const [head, tail] = file.split(num, 2);

    return [head, +num, tail, v];
  });

  return fileInfo
    .sort((a, b) => {
      if (a[0] === b[0]) {
        if (a[1] < b[1]) return -1;
        else return 1;
      } else if (a[0] < b[0]) return -1;
      else return 1;
    })
    .map((v) => v[3]);
}
