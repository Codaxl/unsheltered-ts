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
import { StatsDataServices } from "@/views/Funding/FirestoreDataServices";
import FundsStore from "@/store/funds/funds-store";
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

  private orgCount = [];
  private isLoading = false;
  private years: string[] = ["2019", "2018"];
  private e1 = "2019";
  private organizations: string[] = [
    "Lighthouse Social Service Center",
    "Housing Authority",
    "Operation SafeHouse"
  ];
  private e2 = "";
  private grants: string[] = ["HUD:CoC", "HEAP"];
  private e3 = "";
  private sources: string[] = ["Federal", "State", "County", "City"];
  private e4 = "";
  private stats: any = [];

  private chartData: any = [];

  created() {
    this.loadData();
  }
  private loadData() {
    this.isLoading = true;
    const statsDataService = new StatsDataServices();
    const yearFilter = this.e1;
    const orgFilter = this.e2;
    const grantFilter = this.e3;
    const sourceFilter = this.e4;
    statsDataService
      .GetAll(yearFilter, orgFilter, grantFilter, sourceFilter)
      .then((data: any) => {
        this.stats = data;
        this.isLoading = false;
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

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "organization";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(
      dy: any,
      target: any
    ) {
      if (target.dataItem && target.dataItem.index) {
        return dy + 25;
      }
      return dy;
    });

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "amount";
    series.dataFields.categoryX = "organization";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;

    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

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
  height: 500px;
}
</style>
