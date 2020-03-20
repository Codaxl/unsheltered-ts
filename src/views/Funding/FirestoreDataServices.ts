import { db } from "@/firebase";

export class FirestoreDataServices {
  getAll(tableName: string, recordID: string, docToRecordMap: any) {
    return new Promise(function(resolve, reject) {
      const records: Array<object> = [];
      db.collection(tableName)
        .where("year", "==", recordID)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            records.push(docToRecordMap(doc));
          });
          resolve(records);
        });
    });
  }
}

export class StatsRecord {
  id = "";
  amount = "";
  category = "";
  organization = "";
  projectName = "";
  source = "";
  year = "";
  grant = "";
}

export function DocToFundRecordMap(doc: any): StatsRecord {
  const rowData = doc.data();
  const record = {
    id: doc.id,
    amount: rowData.amount,
    category: rowData.category,
    organization: rowData.organization,
    projectName: rowData.projectName,
    source: rowData.source,
    year: rowData.year,
    grant: rowData.grant
  };
  return record;
}

export class StatsDataServices {
  dataServices: FirestoreDataServices;
  constructor() {
    this.dataServices = new FirestoreDataServices();
  }
  GetStats(recordID: string) {
    return this.dataServices.getAll("funds", recordID, DocToFundRecordMap);
  }
}
