import { db } from "@/firebase";
//https://github.com/michaelprosario/fireTodo/tree/master/src/views
import { Query } from "@firebase/firestore-types";

export class FirestoreDataServices {
  getAll(
    tableName: string,
    yearFilter: number,
    granteeFilter: string,
    grantorFilter: string,
    sourceTypeFilter: string,
    docToRecordMap: any
  ) {
    const records: Array<object> = [];
    let query: Query = db.collection(tableName).where("year", "==", yearFilter);

    if (!(!granteeFilter || granteeFilter.trim().length === 0)) {
      query = query.where("grantee", "==", granteeFilter);
    }

    if (!(!grantorFilter || grantorFilter.trim().length === 0)) {
      query = query.where("grantor", "==", grantorFilter);
    }

    if (!(!sourceTypeFilter || sourceTypeFilter.trim().length === 0)) {
      query = query.where("sourceType", "==", sourceTypeFilter);
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
  grantee = "";
  projectName = "";
  sourceType = "";
  year = 0;
  grantor = "";
}

export function DocToFundRecordMap(doc: any): FundsRecord {
  const rowData = doc.data();
  const record = {
    id: doc.id,
    amount: rowData.amount,
    category: rowData.category,
    grantee: rowData.grantee,
    projectName: rowData.projectName,
    sourceType: rowData.sourceType,
    year: rowData.year,
    grantor: rowData.grantor
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
    granteeFilter: string,
    grantorFilter: string,
    sourceTypeFilter: string
  ) {
    return this.dataServices.getAll(
      "projects",
      yearFilter,
      granteeFilter,
      grantorFilter,
      sourceTypeFilter,
      DocToFundRecordMap
    );
  }
}
