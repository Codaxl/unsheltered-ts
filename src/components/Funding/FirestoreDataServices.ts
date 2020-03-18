import { db } from "@/firebase";

export class FirestoreDataServices {
  getRecord(tableName: string, recordID: string, docToRecordMap: any) {
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
  getAll(tableName: string, recordID: string, docToSubDataMap: any) {
    return new Promise(function(resolve, reject) {
      const records: Array<object> = [];
      db.collection(tableName)
        .doc(recordID)
        .collection("subData")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            records.push(docToSubDataMap(doc));
          });

          resolve(records);
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
  cityTotal = "";
}
export class SubDataRecord {
  id = "";
  source = "";
  total = "";
}

export function DocToFundRecordMap(doc: any): StatsRecord {
  const rowData = doc.data();
  const record = {
    id: doc.id,
    amountTotal: rowData.amountTotal,
    federalTotal: rowData.federalTotal,
    stateTotal: rowData.stateTotal,
    countyTotal: rowData.countyTotal,
    cityTotal: rowData.cityTotal
  };
  return record;
}
export function DocToSubDataRecordMap(doc: any): SubDataRecord {
  const rowData = doc.data();
  const record = {
    id: doc.id,
    source: rowData.source,
    total: rowData.total
  };
  return record;
}

export class StatsDataServices {
  dataServices: FirestoreDataServices;
  constructor() {
    this.dataServices = new FirestoreDataServices();
  }
  GetStats(recordID: string) {
    return this.dataServices.getRecord("funds", recordID, DocToFundRecordMap);
  }
  GetAll(recordID: string) {
    return this.dataServices.getAll("funds", recordID, DocToSubDataRecordMap);
  }
}
