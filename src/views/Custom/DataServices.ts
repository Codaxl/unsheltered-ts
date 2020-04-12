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
  getAll(docToCovidRecordMap: any, docToTimelineRecordMap: any) {
    const covidRecords: Array<object> = [];

    const promise1 = new Promise(function(resolve, reject) {
      Vue.axios
        .post(
          "https://data.chhs.ca.gov/datastore/odata3.0/6cd8d424-dfaa-4bdd-9410-a3d656e1176e?$top=10000&$format=json"
        )
        .then(response => {
          const timelineRecords = response["data"]["value"].map((v: any) =>
            Object.entries(v).reduce(
              (acc, [key, value]) =>
                Object.assign(acc, { [key.replace(/[_-\s+]/g, "")]: value }),
              {}
            )
          );
          // console.log(timelineRecords);
          resolve(timelineRecords);
        });
    });

    return Promise.all([promise1]).then(values => {
      const covid: any = values[0];

      const timelineState = new Promise(function(resolve, reject) {
        // this gives an object with dates as keys
        const groups = covid.reduce((groups: any, doc: any) => {
          const date = new Date(doc.MostRecentDate).toISOString().substr(0, 10);
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(docToTimelineRecordMap(doc));
          return groups;
        }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map(date => {
          const arr = groups[date];

          const totalAmountConfirmed = arr.reduce(
            (prev: any, curr: any) => prev + (Number(curr.confirmed) || 0),
            0
          );
          const totalAmountDeaths = arr.reduce(
            (prev: any, curr: any) => prev + (Number(curr.deaths) || 0),
            0
          );
          const totalAmountRecovered = arr.reduce(
            (prev: any, curr: any) => prev + (Number(curr.recovered) || 0),
            0
          );

          return {
            confirmed: totalAmountConfirmed,
            deaths: totalAmountDeaths,
            recovered: totalAmountRecovered,
            date,
            list: groups[date]
          };
        });
        // console.log(groupArrays)
        covidStoreState.setTimeline(groupArrays);
        resolve(covidStoreState);
      });
    });
  }
}
export class TimelineRecord {
  //
  confirmed = 0;
  deaths = 0;
  recovered = 0;
  id = "";
}

export function DocToTimelineRecordMap(doc: any): TimelineRecord {
  const obj = CountyId;
  const idArr = [doc.CountyName];
  const idValueMap: any = obj.reduce(
    (acc, { text, value }) => ({ ...acc, [text]: value }),
    {}
  );
  const output = idArr.map(value => idValueMap[value]);

  const timelineRecord = {
    //
    confirmed: Number(doc.TotalCountConfirmed),
    deaths: Number(doc.TotalCountDeaths),
    recovered: Number(doc.ICUCOVID19PositivePatients),
    id: output.toString()
  };
  return timelineRecord;
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
    return this.dataServices.getAll(
      DocToCovidRecordMap,
      DocToTimelineRecordMap
    );
  }
}
