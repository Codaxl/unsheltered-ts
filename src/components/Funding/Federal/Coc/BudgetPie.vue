<template>
  <v-container>
    <div class="hello" ref="chartdiv"></div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themesAnimated);

@Component({})
export default class BudgetPie extends Vue {
  $refs!: {
    chartdiv: HTMLElement;
  };
  private chart: any;
  private chartData: Array<object> = [
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
  ];

  public budgetPie(): void {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);

    chart.responsive.enabled = true;

    chart.data = this.chartData;
    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    // Add legend
    chart.legend = new am4charts.Legend();

    // Responsive
    chart.responsive.enabled = true;
    chart.responsive.rules.push({
      relevant: function(target) {
        if (target.pixelWidth <= 700) {
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
      }
    });

    this.chart = chart;
  }
  mounted() {
    this.budgetPie();
  }
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<style scoped>
.hello {
  width: 100%;
  height: 430px;
}
</style>
