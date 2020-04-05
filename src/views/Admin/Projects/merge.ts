export default class Merge {
  static byKey(a1: any[], a2: any[], key: string) {
    const res = a1.concat(a2).reduce((acc, x) => {
      acc[x[key]] = Object.assign(acc[x[key]] || {}, x);
      return acc;
    }, {});

    return Object.entries(res).map(pair => {
      const [, value] = pair;
      return value;
    });
  }
}
