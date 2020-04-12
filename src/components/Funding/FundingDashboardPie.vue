<template>
  <v-card>
    <v-container>
      <div>
        <div class="hello" ref="fundingDashboardPie"></div>
      </div>
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

// AMCHARTS
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import am4themesMaterial from "@amcharts/amcharts4/themes/material";
import am4themesDark from "@amcharts/amcharts4/themes/dark";

@Component({})
export default class FundingDashboardPie extends Vue {
  $refs!: {
    fundingDashboardPie: HTMLElement;
  };
  private container: any;
  private loading = false;

  private chartData: any = [];

  private data: any = [
    {
      source: "Federal",
      amount: fundStoreState.federalTotal
    },
    {
      source: "State",
      amount: fundStoreState.stateTotal
    },
    {
      source: "County",
      amount: fundStoreState.countyTotal
    },
    {
      source: "Local",
      amount: fundStoreState.localTotal
    },
    {
      source: "NA: Not applicable",
      amount: fundStoreState.naTotal
    }
  ];

  public init() {
    am4core.unuseTheme(am4themesDark);
    am4core.useTheme(am4themesAnimated);
    am4core.useTheme(am4themesMaterial);
    this.loading = true;
    const container = am4core.create(
      this.$refs.fundingDashboardPie,
      am4core.Container
    );
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";
    // console.log("final");

    const chart = container.createChild(am4charts.PieChart);

    // Add data
    chart.data = this.data;
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
    /**
     * ========================================================
     * Enabling responsive features
     * ========================================================
     */

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
          return state as any;
        }

        return null;
      }
    });
    this.container = container;
  }
  mounted() {
    setTimeout(() => {
      this.init();
    }, 500);

    this.loading = false;
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
  height: 640px;
}
</style>
