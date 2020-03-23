import { db } from "@/firebase";
//https://github.com/michaelprosario/fireTodo/tree/master/src/views
import { Query } from "@firebase/firestore-types";

export class FirestoreDataServices {
  getAll(
    tableName: string,
    yearFilter: number,
    orgFilter: string,
    grantFilter: string,
    sourceFilter: string,
    docToRecordMap: any
  ) {
    const records: Array<object> = [];
    let query: Query = db.collection(tableName).where("year", "==", yearFilter);

    if (!(!orgFilter || orgFilter.trim().length === 0)) {
      query = query.where("organization", "==", orgFilter);
    }

    if (!(!grantFilter || grantFilter.trim().length === 0)) {
      query = query.where("grant", "==", grantFilter);
    }

    if (!(!sourceFilter || sourceFilter.trim().length === 0)) {
      query = query.where("source", "==", sourceFilter);
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

export class FundsRecord {
  id = "";
  amount = "";
  category = "";
  organization = "";
  projectName = "";
  source = "";
  year = 0;
  grant = "";
}

export function DocToFundRecordMap(doc: any): FundsRecord {
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

export class FundsDataServices {
  dataServices: FirestoreDataServices;
  constructor() {
    this.dataServices = new FirestoreDataServices();
  }
  GetAll(
    yearFilter: number,
    orgFilter: string,
    grantFilter: string,
    sourceFilter: string
  ) {
    return this.dataServices.getAll(
      "funds",
      yearFilter,
      orgFilter,
      grantFilter,
      sourceFilter,
      DocToFundRecordMap
    );
  }
}
