import Vue from "vue";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
Vue.filter("strip", function(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
});
