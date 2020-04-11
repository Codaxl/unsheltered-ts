import { db } from "@/firebase";
//https://github.com/michaelprosario/fireTodo/tree/master/src/views
import { Query } from "@firebase/firestore-types";
// Vuex
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);
// Merge
import Merge from "@/util/constants/admin/merge";

import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export class FirestoreDataServices {
  getAll(docToProjectRecordMap: any, docToFunderRecordMap: any) {
    const projectRecords: Array<object> = [];
    const funderRecords: Array<object> = [];

    const promise1 = new Promise(function(resolve, reject) {
      db.collection("Project")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            projectRecords.push(docToProjectRecordMap(doc));
          });

          resolve(projectRecords);
        });
    });

    const promise2 = new Promise(function(resolve, reject) {
      db.collection("Funder")
        .where("EndDate", ">=", new Date())
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            funderRecords.push(docToFunderRecordMap(doc));
          });

          resolve(funderRecords);
        });
    });

    return Promise.all([promise1, promise2]).then(values => {
      const project: any = values[0];
      const funder: any = values[1];
      const dataState = new Promise(function(resolve, reject) {
        const merge = Merge.byKey(project, funder, "ProjectID");

        fundStoreState.setData(merge);

        resolve(fundStoreState);
      });

      const subDataState = new Promise(function(resolve, reject) {
        const uniqueArr = fundStoreState.data.map((data: any) => data.subData);
        const concatArr = Array.prototype.concat(...uniqueArr);

        fundStoreState.setSubData(concatArr);

        resolve(fundStoreState);
      });
    });
  }
}

export class ProjectRecord {
  //
  ProjectID = "";
  OrganizationID = "";
  ProjectName = "";
  ProjectCommonName = "";
  OperatingStartDate = "";
  OperatingEndDate = "";
  ContinuumProject = 0;
  ProjectType = 0;
  HousingType = 0;
  ResidentialAffiliation = 0;
  TrackingMethod = 0;
  HMISParticipatingProject = 0;
  TargetPopulation = 0;
  PITCount = 0;
  DateCreated = new Date();
  DateUpdated = new Date();
  UserID = "";
  // Custom
}

export class FunderRecord {
  //
  FunderID = "";
  Funder = 0;
  ProjectID = "";
  GrantID = "";
  Amount = 0;
  StartDate = "";
  EndDate = "";
}
export function DocToProjectRecordMap(doc: any): ProjectRecord {
  const projectRecord = {
    //
    ProjectID: doc.id,
    OrganizationID: doc.data().OrganizationID,
    ProjectName: doc.data().ProjectName,
    ProjectCommonName: doc.data().ProjectCommonName,
    OperatingStartDate: format(
      doc.data().OperatingStartDate.toDate(),
      "yyyy-MM-dd"
    ),
    OperatingEndDate: format(
      doc.data().OperatingEndDate.toDate(),
      "yyyy-MM-dd"
    ),
    ContinuumProject: doc.data().ContinuumProject,
    ProjectType: doc.data().ProjectType,
    HousingType: doc.data().HousingType,
    ResidentialAffiliation: doc.data().ResidentialAffiliation,
    TrackingMethod: doc.data().TrackingMethod,
    HMISParticipatingProject: doc.data().HMISParticipatingProject,
    TargetPopulation: doc.data().TargetPopulation,
    PITCount: doc.data().PITCount,
    DateCreated: doc.data().DateCreated.toDate(),
    DateUpdated: doc.data().DateUpdated.toDate(),
    UserID: doc.data().UserID
    // Custom
  };
  return projectRecord;
}

export function DocToFunderRecordMap(doc: any): FunderRecord {
  const funderRecord = {
    //
    FunderID: doc.id,
    Funder: doc.data().Funder,
    ProjectID: doc.data().ProjectID,
    GrantID: doc.data().GrantID,
    Amount: doc.data().Amount,
    StartDate: format(doc.data().StartDate.toDate(), "yyyy-MM-dd"),
    EndDate: format(doc.data().EndDate.toDate(), "yyyy-MM-dd")
  };
  return funderRecord;
}

export class DataServices {
  dataServices: FirestoreDataServices;
  constructor() {
    this.dataServices = new FirestoreDataServices();
  }
  GetAll() {
    return this.dataServices.getAll(
      DocToProjectRecordMap,
      DocToFunderRecordMap
    );
  }
}
