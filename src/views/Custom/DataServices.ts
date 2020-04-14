import { Vue } from "vue-property-decorator";
// Vuex
import { getModule } from "vuex-module-decorators";
import CovidStore from "@/store/covid/covid-store";
const covidStoreState = getModule(CovidStore);
// Merge
import Merge from "@/util/constants/admin/merge";
import CountyId from "./data/js/CaCountyId";
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
          const dateA: any = new Date(a.date);
          const dateB: any = new Date(b.date);
          // console.log(dateB)
          return dateA - dateB;
        });

        // console.log(groupArrays);
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
  const timelineRecord = {
    //
    confirmed: Number(doc.TotalCountConfirmed),
    deaths: Number(doc.TotalCountDeaths),
    recovered: Number(doc.ICUCOVID19PositivePatients),
    id: camelCase(doc.CountyName)
  };
  return timelineRecord;
}

/**
 * Convert string to camelCase text.
 */
export function camelCase(str: string) {
  str = replaceAccents(str);
  str = removeNonWord(str)
    .replace(/-/g, " ") //convert all hyphens to spaces
    .replace(/\s[a-z]/g, upperCase) //convert first char of each word to UPPERCASE
    .replace(/\s+/g, "") //remove spaces
    .replace(/^[A-Z]/g, lowerCase); //convert first char to lowercase
  return str;
}
/**
 * "Safer" String.toUpperCase()
 */
function upperCase(str: string) {
  return str.toUpperCase();
}
/**
 * "Safer" String.toLowerCase()
 */
function lowerCase(str: string) {
  return str.toLowerCase();
}
/**
 * Replaces all accented chars with regular ones
 */
export function replaceAccents(str: string) {
  // verifies if the String has accents and replace them
  if (str.search(/[\xC0-\xFF]/g) > -1) {
    str = str
      .replace(/[\xC0-\xC5]/g, "A")
      .replace(/[\xC6]/g, "AE")
      .replace(/[\xC7]/g, "C")
      .replace(/[\xC8-\xCB]/g, "E")
      .replace(/[\xCC-\xCF]/g, "I")
      .replace(/[\xD0]/g, "D")
      .replace(/[\xD1]/g, "N")
      .replace(/[\xD2-\xD6\xD8]/g, "O")
      .replace(/[\xD9-\xDC]/g, "U")
      .replace(/[\xDD]/g, "Y")
      .replace(/[\xDE]/g, "P")
      .replace(/[\xE0-\xE5]/g, "a")
      .replace(/[\xE6]/g, "ae")
      .replace(/[\xE7]/g, "c")
      .replace(/[\xE8-\xEB]/g, "e")
      .replace(/[\xEC-\xEF]/g, "i")
      .replace(/[\xF1]/g, "n")
      .replace(/[\xF2-\xF6\xF8]/g, "o")
      .replace(/[\xF9-\xFC]/g, "u")
      .replace(/[\xFE]/g, "p")
      .replace(/[\xFD\xFF]/g, "y");
  }

  return str;
}

export function removeNonWord(str: string) {
  return str.replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, "");
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
