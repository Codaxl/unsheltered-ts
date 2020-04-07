export default class Merge {
  static byKey(array1: any[], array2: any[], key: string) {
    array1.forEach(function(e) {
      const i = array2.filter(a => a[key] === e[key]).map(a => a);
      e.subData = i;

      const obj = Object.keys(e.subData);

      if (obj.length > 0) {
        let total = 0;
        const today = new Date();

        for (let i = 0; i < obj.length; i++) {
          const amount = e.subData[i].Amount;
          const startDate = new Date(e.subData[i].StartDate);
          if (isNaN(amount)) {
            continue;
          }
          if (startDate < today) {
            total += Number(e.subData[i].Amount);
          }
        }
        return (e.AmountTotal = total);
      }
    });
    return array1;
  }
}
