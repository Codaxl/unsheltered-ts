import Vue from "vue";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
Vue.filter("fullDate", function(d: string) {
  const results = parseISO(d, { additionalDigits: 0 });

  return results ? format(results, "PPP") : "";
});

Vue.filter("iso", function(d: Date) {
  return d ? format(d, "yyyy-MM-dd") : "";
});
