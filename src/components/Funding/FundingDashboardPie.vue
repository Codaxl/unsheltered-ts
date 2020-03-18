<template>
  <v-container>
    <div class="hello" ref="chartdiv"></div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { StatsDataServices } from "./FirestoreDataServices";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themesAnimated);

@Component({})
export default class FundingDashboardPie extends Vue {
  $refs!: {
    chartdiv: HTMLElement;
  };
  private container: any;

  private e1 = "2019";
  private chartData: any = [];

  created() {
    console.log("start");
    this.loadData();
  }
  private loadData() {
    const statsDataService = new StatsDataServices();
    const year = this.e1;
    statsDataService.GetAll(year).then(data => {
      this.chartData = data;
      console.log(data);
    });
  }

  public async init() {
    console.log("end");
    const container = am4core.create(this.$refs.chartdiv, am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    const chart = container.createChild(am4charts.PieChart);

    // Add data

    chart.data = this.chartData;
    console.log(this.chartData);

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "total";
    pieSeries.dataFields.category = "source";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    // Add legend
    chart.legend = new am4charts.Legend();

    this.container = container;
  }
  mounted() {
    this.init();
  }
  beforeDestroy() {
    if (this.container) {
      this.container.dispose();
    }
  }
}
</script>

<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
