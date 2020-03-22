<template>
  <v-card>
    <v-container>
      <div class="hello" ref="fundingDashboardBar"></div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
// Vuex
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);

// DATA
import { StatsDataServices } from "@/views/Funding/FirestoreDataServices";

// AMCHARTS
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themesAnimated);

@Component({})
export default class FundingDashboardBar extends Vue {
  $refs!: {
    fundingDashboardBar: HTMLElement;
  };
  private container: any;

  private chartData: any = [];

  created() {
    this.loadData();
  }
  private loadData() {
    const statsDataService = new StatsDataServices();
    statsDataService
      .GetAll(
        fundStoreState.yearFilter,
        fundStoreState.orgFilter,
        fundStoreState.grantFilter,
        fundStoreState.sourceFilter
      )
      .then(data => {
        this.chartData = data;
      });
  }

  public init() {
    const container = am4core.create(
      this.$refs.fundingDashboardBar,
      am4core.Container
    );
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    const chart = container.createChild(am4charts.XYChart);

    // Add data
    chart.data = this.chartData;
    // Add and configure Series

    // Create axes
    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "organization";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    // Object is possibly 'undefined'.
    // categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "amount";
    series.dataFields.categoryX = "organization";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;
    // Object is possibly 'undefined'.
    // series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;
    // Make it stacked
    series.stacked = true;
    // on hover, make corner radiuses bigger
    const hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;
    // Object is possibly 'undefined'.
    // series.columns.template.adapter.add("fill", function(fill, target) {
    //   return chart.colors.getIndex(target.dataItem.index);
    // });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    this.container = container;
  }
  mounted() {
    setTimeout(() => {
      this.init();
    }, 300);
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
  height: 650px;
}
</style>
