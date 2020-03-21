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
// Vuex
// import { namespace } from 'vuex-class'
// const fundsModule = namespace('Funds')

// DATA
import { StatsDataServices } from "@/views/Funding/FirestoreDataServices";

// AMCHARTS
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themesAnimated);

@Component({})
export default class FundingDashboardPie extends Vue {
  $refs!: {
    fundingDashboardPie: HTMLElement;
  };
  private container: any;

  private e1 = "2019";
  private chartData: any = [];

  created() {
    this.loadData();
  }
  private loadData() {
    const statsDataService = new StatsDataServices();
    const year = this.e1;
    statsDataService.GetAll(year).then((data: any) => {
      this.chartData = data;
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
