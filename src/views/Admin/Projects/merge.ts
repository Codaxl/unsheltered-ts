export default class Merge {
  static byKey(array1: any[], array2: any[], key: string) {
    array1.forEach(function(e) {
      const i = array2.filter(a => a[key] === e[key]).map(a => a);
      e.subData = i;
      if (Object.keys(e.subData).length > 0) {
        return (e.Funder = true);
      } else {
        return (e.Funder = false);
      }
    });
    return array1;
  }
}
