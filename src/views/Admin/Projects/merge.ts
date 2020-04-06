export default class Merge {
  static byKey(array1: any[], array2: any[], key: string) {
    array1.forEach(function(e) {
      const i = array2.filter(a => a.ProjectID === e.ProjectID).map(a => a);
      e.subData = i;
    });
    console.log(array1);
    return array1;
  }
}
