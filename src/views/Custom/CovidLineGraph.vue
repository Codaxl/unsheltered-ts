<template>
  <div>
    <v-card dark :loading="isLoading">
      <div id="covidLineGraph" ref="covidLineGraph" class="hello"></div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";

import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import am4themesDark from "@amcharts/amcharts4/themes/dark";

// Vuex

import { getModule } from "vuex-module-decorators";
import CovidStore from "@/store/covid/covid-store";
const covidStoreState = getModule(CovidStore);

// Themes begin
am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesDark);
// Themes end

@Component({})
export default class CovidLineGraph extends Vue {
  $refs!: {
    covidLineGraph: HTMLElement;
  };
  private container: any;
  private isLoading = false;

  private chartData: any = [];
  public init() {
    const covidTimeline: any = JSON.parse(
      JSON.stringify(covidStoreState.timeline)
    );
    // console.log(covidTimeline);
    // END OF DATA

    //////////////////////////////////////////////////////////////////////////////
    // LAYOUT & CHARTS
    //////////////////////////////////////////////////////////////////////////////

    // main container
    // https://www.amcharts.com/docs/v4/concepts/svg-engine/containers/
    const container: any = am4core.create(
      this.$refs.covidLineGraph,
      am4core.Container
    );
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    // console.log("final");

    const chart = container.createChild(am4charts.XYChart);
    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    for (let i = 0; i < 10; i++) {
      createSeries("value" + i, "Series #" + i);
    }

    // Create series
    function createSeries(s: string, name: string) {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value" + s;
      series.dataFields.dateX = "date";
      series.name = name;

      const segment = series.segments.template;
      segment.interactionsEnabled = true;

      const hoverState = segment.states.create("hover");
      hoverState.properties.strokeWidth = 3;

      const dimmed = segment.states.create("dimmed");
      dimmed.properties.stroke = am4core.color("#dadada");

      segment.events.on("over", function(event: any) {
        processOver(event.target.parent.parent.parent);
      });

      segment.events.on("out", function(event: any) {
        processOut(event.target.parent.parent.parent);
      });

      const data = [];
      let value: number = Math.round(Math.random() * 100) + 100;
      for (let i = 1; i < 100; i++) {
        value += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5
        );
        const dataItem: any = { date: new Date(2018, 0, i) };
        dataItem["value" + s] = value;
        data.push(dataItem);
      }

      series.data = data;
      return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.events.on("over", function(
      event: any
    ) {
      processOver(event.target.dataItem.dataContext);
    });

    chart.legend.itemContainers.template.events.on("out", function(event: any) {
      processOut(event.target.dataItem.dataContext);
    });

    function processOver(hoveredSeries: any) {
      hoveredSeries.toFront();

      hoveredSeries.segments.each(function(segment: any) {
        segment.setState("hover");
      });

      chart.series.each(function(series: any) {
        if (series != hoveredSeries) {
          series.segments.each(function(segment: any) {
            segment.setState("dimmed");
          });
          series.bulletsContainer.setState("dimmed");
        }
      });
    }

    function processOut(hoveredSeries: any) {
      chart.series.each(function(series: any) {
        series.segments.each(function(segment: any) {
          segment.setState("default");
        });
        series.bulletsContainer.setState("default");
      });
    }
    /**
     * Country/state list on the right
     */

    this.container = container;
    this.isLoading = false;
  }
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.init();
    }, 500);
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
  max-width: 100%;
  height: 800px;
  background-color: #212327;
}
</style>
