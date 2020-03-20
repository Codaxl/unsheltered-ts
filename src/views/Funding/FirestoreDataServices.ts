import { db } from "@/firebase";
//https://github.com/michaelprosario/fireTodo/tree/master/src/views
import { Query } from "@firebase/firestore-types";

export class FirestoreDataServices {
  getAll(
    tableName: string,
    yearFilter: string,
    orgFilter: string,
    grantFilter: string,
    docToRecordMap: any
  ) {
    const records: Array<object> = [];
    let query: Query = db.collection(tableName).where("year", "==", yearFilter);

    if (!(!orgFilter || orgFilter.trim().length === 0)) {
      console.log("Organization selected!");
      query = query.where("organization", "==", orgFilter);
    } else if (!(!grantFilter || grantFilter.trim().length === 0)) {
      console.log("Grant selected!");
      query = query.where("organization", "==", grantFilter);
    } else {
      console.log("Just year");
      query = query.where("year", "==", yearFilter);
    }

    const result = new Promise(function(resolve, reject) {
      query.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          records.push(docToRecordMap(doc));
        });
        resolve(records);
      });
    });
    return result;
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
  GetAll(yearFilter: string, orgFilter: string, grantFilter: string) {
    return this.dataServices.getAll(
      "funds",
      yearFilter,
      orgFilter,
      grantFilter,
      DocToFundRecordMap
    );
  }
}
