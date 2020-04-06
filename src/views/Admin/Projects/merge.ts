export default class Merge {
  static byKey(array1: any[], array2: any[], key: string) {
    // const arrayName = "Funder";
    // console.log({"name": array2});

    let ids = array1.map(el => el[key]);
    ids = Array.from(new Set(ids)); // Get unique ids as set are always unique

    array1.forEach(function(e) {
      const i = array2.filter(a => a.ProjectID === e.ProjectID).map(a => a);
      e.subData = i;
      console.log(i);
    });

    console.log(array1);

    const array3 = array2.filter(el => {
      ids.indexOf(el[key]) !== -1;
    });

    // console.log({Funder:array3});
    // console.log("Object.entries(result)" + JSON.stringify(Object.entries(result)))

    return array1;
  }
}
