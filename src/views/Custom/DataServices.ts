import { Vue } from "vue-property-decorator";
// Vuex
import { getModule } from "vuex-module-decorators";
import CovidStore from "@/store/covid/covid-store";
const covidStoreState = getModule(CovidStore);

import { camelCase } from "@/mixins/format";

export class ApiDataServices {
  getAll(docToTimelineRecordMap: any) {
    const covidRecords: Array<object> = [];

    const promise1 = new Promise(function(resolve, reject) {
      Vue.axios
        .post(
          "https://data.chhs.ca.gov/datastore/odata3.0/6cd8d424-dfaa-4bdd-9410-a3d656e1176e?$top=10000&$format=json"
        )
        .then(response => {
          // console.log(response);
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

        // Sort Ascending by Date
        groupArrays.sort(function compare(a, b) {
          const dateA: Date = new Date(a.date);
          const dateB: Date = new Date(b.date);
          // console.log(dateB)
          return +dateA - +dateB;
        });

        // console.log(groupArrays);
        covidStoreState.setTimeline(groupArrays);
        resolve(covidStoreState);
      });

      // const countyState = new Promise(function(resolve, reject) {
      //   // Edit: to add it in the array format instead
      //
      //   //https://stackoverflow.com/questions/53826570/reduce-array-of-objects-by-user-id-and-sum-certain-values
      //   const dataTotals: Array<object> = Object.values(
      //     covid.reduce((a: any, c: any) => {
      //       const newId = camelCase(c.CountyName);
      //       if (!a[newId]) {
      //         a[newId] = {
      //           id: camelCase(c.CountyName),
      //           confirmed: Number(c.TotalCountConfirmed),
      //           deaths: Number(c.TotalCountDeaths),
      //           recovered: Number(c.COVID19PositivePatients)
      //         };
      //       } else {
      //         a[newId].confirmed += Number(c.TotalCountConfirmed);
      //         a[newId].deaths += Number(c.TotalCountDeaths);
      //         a[newId].recovered += Number(c.COVID19PositivePatients);
      //       }
      //       return a;
      //     }, {})
      //   );
      //
      //   // console.log(dataTotals)
      //
      //   // Sort Ascending by Date
      //   dataTotals.sort((a:any, b:any) => a.id.localeCompare(b.id))
      //   //
      //   // console.log(dataTotals);
      //   covidStoreState.setCountyTotal(dataTotals);
      //   resolve(covidStoreState);
      // });
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

export function DocToTimelineRecordMap(doc: CovidRecord): TimelineRecord {
  const timelineRecord = {
    //
    confirmed: Number(doc.TotalCountConfirmed),
    deaths: Number(doc.TotalCountDeaths),
    recovered: Number(doc.COVID19PositivePatients),
    id: camelCase(doc.CountyName)
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
  id = "";
  CountyName = "";
  TotalCountConfirmed = 0;
}

export class DataServices {
  dataServices: ApiDataServices;
  constructor() {
    this.dataServices = new ApiDataServices();
  }
  GetAll() {
    return this.dataServices.getAll(DocToTimelineRecordMap);
  }
}
