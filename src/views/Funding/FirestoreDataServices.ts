import { db } from "@/firebase";

export class FirestoreDataServices {
  getAll(tableName: string, recordID: string, docToRecordMap: any) {
    return new Promise(function(resolve, reject) {
      const records: Array<object> = [];
      db.collection(tableName)
        .doc(recordID)
        .get()
        .then(function(doc: any) {
          if (doc.exists) {
            resolve(docToRecordMap(doc));
          } else {
            reject("Record not found");
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
}

export class StatsRecord {
  id = "";
  amountTotal = "";
  federalTotal = "";
  stateTotal = "";
  countyTotal = "";
  localTotal = "";
}

export function DocToFundRecordMap(doc: any): StatsRecord {
  const rowData = doc.data();
  const record = {
    id: doc.id,
    amountTotal: rowData.amountTotal,
    federalTotal: rowData.federalTotal,
    stateTotal: rowData.stateTotal,
    countyTotal: rowData.countyTotal,
    localTotal: rowData.localTotal
  };
  return record;
}

export class StatsDataServices {
  dataServices: FirestoreDataServices;
  constructor() {
    this.dataServices = new FirestoreDataServices();
  }
  GetAll() {
    return this.dataServices.getAll("funds", "2019", DocToFundRecordMap);
  }
}
