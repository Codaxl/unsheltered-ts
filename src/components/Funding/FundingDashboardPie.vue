<!-- <template>
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

// DATA
import { FundsDataServices } from "@/views/Funding/FirestoreDataServices";

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
      source: "City",
      amount: fundStoreState.cityTotal
    }
  ];

  public init() {
    this.loading = true;
    const container = am4core.create(
      this.$refs.fundingDashboardPie,
      am4core.Container
    );
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

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
  height: 500px;
}
</style> -->
