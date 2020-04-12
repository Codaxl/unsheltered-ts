import { Vue } from "vue-property-decorator";
// Vuex
import { getModule } from "vuex-module-decorators";
import CovidStore from "@/store/covid/covid-store";
const covidStoreState = getModule(CovidStore);
// Merge
import Merge from "@/util/constants/admin/merge";
import CountyId from "./county-id";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export class ApiDataServices {
  getAll(docToCovidRecordMap: any) {
    const covidRecords: Array<object> = [];

    const promise1 = new Promise(function(resolve, reject) {
      Vue.axios
        .post(
          "https://data.chhs.ca.gov/datastore/odata3.0/6cd8d424-dfaa-4bdd-9410-a3d656e1176e?$format=json"
        )
        .then(response => {
          const timelineRecords = response["data"]["value"].map((v: any) =>
            Object.entries(v).reduce(
              (acc, [key, value]) =>
                Object.assign(acc, { [key.replace(/[_-\s+]/g, "")]: value }),
              {}
            )
          );
          resolve(timelineRecords);
        });
    });

    return Promise.all([promise1]).then(values => {
      const covid: any = values[0];

      const timelineState = new Promise(function(resolve, reject) {
        // this gives an object with dates as keys
        const groups = covid.reduce((groups: any, arr: any) => {
          const date = new Date(arr.MostRecentDate).toISOString().substr(0, 10);

          const obj = CountyId;
          const idArr = [arr.CountyName];
          const idValueMap: any = obj.reduce(
            (acc, { text, value }) => ({ ...acc, [text]: value }),
            {}
          );
          const output = idArr.map(value => idValueMap[value]);

          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push({
            confirmed: Number(arr.COVID19PositivePatients),
            deaths: Number(arr.TotalCountDeaths),
            recovered: Number(arr.ICUCOVID19PositivePatients),
            id: output.toString()
          });
          return groups;
        }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map(date => {
          return {
            date,
            list: groups[date]
          };
        });

        const groupArrays2 = Object.keys(groups).map(date => {
          const arr = groups[date];

          const sum = arr.reduce((a: any, b: any) => ({
            confirmed: a.confirmed + b.confirmed,
            deaths: a.deaths + b.deaths,
            recovered: a.recovered + b.recovered
          }));

          console.log(confirmed);
          return {
            ...sum,
            date
          };
        });

        covidStoreState.setTimeline(groupArrays);
        covidStoreState.setTotalTimeline(groupArrays2);
        resolve(covidStoreState);
      });
    });
  }
}

export class CovidRecord {
  MostRecentDate = "";
  TotalCountDeaths = 0;
  ICUCOVID19PositivePatients = 0;
  ICUCOVID19SuspectedPatients = 0;
  SuspectedCOVID19PositivePatients = 0;
  COVID19PositivePatients = 0;
  id = 0;
  CountyName = "";
  TotalCountConfirmed = 0;
}

export function DocToCovidRecordMap(doc: any): CovidRecord {
  const covidRecord = {
    //
    MostRecentDate: "",
    TotalCountDeaths: 0,
    ICUCOVID19PositivePatients: 0,
    ICUCOVID19SuspectedPatients: 0,
    SuspectedCOVID19PositivePatients: 0,
    COVID19PositivePatients: 0,
    id: 0,
    CountyName: "",
    TotalCountConfirmed: 0
    // Custom
  };
  return covidRecord;
}

export class DataServices {
  dataServices: ApiDataServices;
  constructor() {
    this.dataServices = new ApiDataServices();
  }
  GetAll() {
    return this.dataServices.getAll(DocToCovidRecordMap);
  }
}
