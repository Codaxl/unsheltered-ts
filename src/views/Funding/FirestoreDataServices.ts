import { db } from "@/firebase";
//https://github.com/michaelprosario/fireTodo/tree/master/src/views
export class FirestoreDataServices {
  getAll(
    tableName: string,
    yearFilter: string,
    orgFilter: string,
    docToRecordMap: any
  ) {
    return new Promise(function(resolve, reject) {
      const records: Array<object> = [];
      db.collection(tableName)
        .where("year", "==", yearFilter)
        .where("organization", "==", orgFilter)
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
  GetStats(yearFilter: string, orgFilter: string) {
    return this.dataServices.getAll(
      "funds",
      yearFilter,
      orgFilter,
      DocToFundRecordMap
    );
  }
}
