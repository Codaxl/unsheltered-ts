<template>
  <v-container>
    <div class="hello" ref="chartdiv"></div>
  </v-container>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themesAnimated);

export default (Vue as VueConstructor<
  Vue & { $refs: { chartdiv: HTMLElement } }
>).extend({
  name: "BudgetPie",
  data: () => ({
    chartData: [
      {
        country: "Services",
        litres: 2841715.88
      },
      {
        country: "Rental Assistance or Subsidies",
        litres: 1629988.57
      },
      {
        country: "Capital Improvements",
        litres: 4340920.36
      },
      {
        country: "Homeless Youth Set-Aside",
        litres: 489590.25
      },
      {
        country: "Administrative Costs",
        litres: 489590.0
      }
    ]
  }),

  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);

    chart.responsive.enabled = true;

    chart.data = this.chartData;

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    // Add legend
    chart.legend = new am4charts.Legend();

    // Responsive
    chart.responsive.enabled = true;
    chart.responsive.rules.push({
      relevant: function(target) {
        if (target.pixelWidth <= 600) {
          return true;
        }
        return false;
      },
      state: function(target, stateId) {
        if (target instanceof am4charts.PieSeries) {
          const state = target.states.create(stateId);

          const labelState = target.labels.template.states.create(stateId);
          labelState.properties.disabled = true;

          const tickState = target.ticks.template.states.create(stateId);
          tickState.properties.disabled = true;
          return state;
        }

        return null;
      }
    });
    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
});
</script>
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
