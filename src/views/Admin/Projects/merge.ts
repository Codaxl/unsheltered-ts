export default class Merge {
  static byKey(array1: any[], array2: any[], key: string) {
    array1.forEach(function(e) {
      const i = array2.filter(a => a[key] === e[key]).map(a => a);
      e.subData = i;

      const input = Object.keys(e.subData);

      if (input.length > 0) {
        let total = 0;
        const today = new Date();
        console.log(today);

        for (let i = 0; i < input.length; i++) {
          if (isNaN(e.subData[i].Amount)) {
            continue;
          }
          if (new Date(e.subData[i].StartDate) < today) {
            total += Number(e.subData[i].Amount);
          }
        }
        return (e.AmountTotal = total);
      }
    });
    return array1;
  }
}
