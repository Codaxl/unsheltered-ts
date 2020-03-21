<template>
  <v-card>
    <v-container>
      <div class="hello" ref="fundingDashboardPie"></div>
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
export default class FundingDashboardPie extends Vue {
  get setYear(): string {
    return FundsStore.yearFilter;
  }
  $refs!: {
    fundingDashboardPie: HTMLElement;
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
      this.$refs.fundingDashboardPie,
      am4core.Container
    );
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    const chart = container.createChild(am4charts.PieChart);

    // Add data
    chart.data = this.chartData;
    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
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
  width: 100%;
  height: 500px;
}
</style>
