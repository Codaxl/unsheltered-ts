<!-- <template>
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

  // DATA FROM VUEX. IS THIS EFFICIENT?

  get funds(): Array<object> {
    return fundStoreState.data;
  }

  private loadData() {
    //maybe https://stackoverflow.com/questions/11199653/javascript-sum-and-group-by-of-json-data
    // o rhttps://stackoverflow.com/questions/19233283/sum-javascript-object-propertya-values-with-same-object-propertyb-in-array-of-ob
    const counts = this.funds.reduce((prev: any, curr: any) => {
      const count = prev.get(curr.grantee) || 0;
      prev.set(curr.grantee, parseFloat(curr.amount) + count);
      return prev;
    }, new Map());

    // then, map your counts object back to an array
    const reducedObjArr = [...counts].map(([grantee, amount]) => {
      return { grantee, amount };
    });
    this.chartData = reducedObjArr;
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
    categoryAxis.dataFields.category = "grantee";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    // Object is possibly 'undefined'.
    // categoryAxis.tooltip.disabled = true;
    // Configure axis label
    const label = categoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 200;
    label.tooltipText = "{grantee}";

    categoryAxis.events.on("sizechanged", function(ev) {
      const axis = ev.target;
      const cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
      if (cellWidth < axis.renderer.labels.template.maxWidth) {
        axis.renderer.labels.template.rotation = -45;
        axis.renderer.labels.template.horizontalCenter = "right";
        axis.renderer.labels.template.verticalCenter = "middle";
      } else {
        axis.renderer.labels.template.rotation = 0;
        axis.renderer.labels.template.horizontalCenter = "middle";
        axis.renderer.labels.template.verticalCenter = "top";
      }
    });

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "amount";

    series.dataFields.categoryX = "grantee";
    series.tooltipText = "${amount} {valueY.totalPercent.formatNumber('#.00')}";
    series.columns.template.strokeWidth = 0;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(
      fill: any,
      target: any
    ) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Object is possibly 'undefined'.
    // series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

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
  height: 650px;
}
</style> -->
