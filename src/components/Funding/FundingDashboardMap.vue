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
export default class FundingDashboardPie extends Vue {
  $refs!: {
    chartdiv: HTMLElement;
  };
  private container: any;

  private chartData: Array<object> = [
    {
      country: "Federal",
      amount: 10000000.0,
      subData: [
        {
          name: "CoC",
          value: 9791805.06
        }
      ]
    },
    {
      country: "State",
      amount: 100000000.0,
      subData: [
        {
          name: "CESH",
          value: 9791805.06
        },
        {
          name: "HEAP",
          value: 9791805.06
        }
      ]
    },
    {
      country: "County",
      amount: 500000.0,
      subData: [
        {
          name: "General",
          value: 500000.0
        }
      ]
    },
    {
      country: "Local",
      amount: 100000.0,
      subData: [
        {
          name: "City of Riverside",
          value: 100000.0
        }
      ]
    }
  ];
  public budgetPie(): void {
    const container = am4core.create(this.$refs.chartdiv, am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    const chart = container.createChild(am4charts.PieChart);

    // Add data

    chart.data = this.chartData;

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "country";
    //Object is possibly 'undefined'.
    pieSeries.slices.template.states.getKey(
      "active"
    ).properties.shiftRadius = 0;
    pieSeries.labels.template.text =
      "{category}\n{value.percent.formatNumber('#.#')}%";

    pieSeries.slices.template.events.on("hit", function(event) {
      // eslint-disable-next-line
      selectSlice(event.target.dataItem);
    });

    const chart2 = container.createChild(am4charts.PieChart);
    chart2.width = am4core.percent(30);
    chart2.radius = am4core.percent(80);

    // Add and configure Series
    const pieSeries2 = chart2.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "name";
    //Object is possibly 'undefined'.
    pieSeries2.slices.template.states.getKey(
      "active"
    ).properties.shiftRadius = 0;

    //pieSeries2.labels.template.radius = am4core.percent(50);
    //pieSeries2.labels.template.inside = true;
    //pieSeries2.labels.template.fill = am4core.color("#ffffff");
    pieSeries2.labels.template.disabled = true;
    pieSeries2.ticks.template.disabled = true;
    pieSeries2.alignLabels = false;
    // eslint-disable-next-line
    pieSeries2.events.on("positionchanged", updateLines);

    const interfaceColors = new am4core.InterfaceColorSet();

    const line1 = container.createChild(am4core.Line);
    line1.strokeDasharray = "2,2";
    line1.strokeOpacity = 0.5;
    line1.stroke = interfaceColors.getFor("alternativeBackground");
    line1.isMeasured = false;

    const line2 = container.createChild(am4core.Line);
    line2.strokeDasharray = "2,2";
    line2.strokeOpacity = 0.5;
    line2.stroke = interfaceColors.getFor("alternativeBackground");
    line2.isMeasured = false;

    let selectedSlice: any;

    function updateLines() {
      if (selectedSlice) {
        let p11 = {
          x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle),
          y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle)
        };
        let p12 = {
          x:
            selectedSlice.radius *
            am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc),
          y:
            selectedSlice.radius *
            am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc)
        };

        p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
        p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

        let p21 = { x: 0, y: -pieSeries2.pixelRadius };
        let p22 = { x: 0, y: pieSeries2.pixelRadius };

        p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
        p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

        line1.x1 = p11.x;
        line1.x2 = p21.x;
        line1.y1 = p11.y;
        line1.y2 = p21.y;

        line2.x1 = p12.x;
        line2.x2 = p22.x;
        line2.y1 = p12.y;
        line2.y2 = p22.y;
      }
    }

    function selectSlice(dataItem: any) {
      selectedSlice = dataItem.slice;

      const fill = selectedSlice.fill;

      const count = dataItem.dataContext.subData.length;
      pieSeries2.colors.list = [];
      for (let i = 0; i < count; i++) {
        pieSeries2.colors.list.push(fill.brighten((i * 2) / count));
      }

      chart2.data = dataItem.dataContext.subData;
      pieSeries2.appear();

      const middleAngle = selectedSlice.middleAngle;
      //Object is possibly 'undefined'.
      const firstAngle = pieSeries.slices.getIndex(0).startAngle;

      const animation = pieSeries.animate(
        [
          { property: "startAngle", to: firstAngle - middleAngle },
          { property: "endAngle", to: firstAngle - middleAngle + 360 }
        ],
        600,
        am4core.ease.sinOut
      );

      animation.events.on("animationprogress", updateLines);

      selectedSlice.events.on("transformed", updateLines);

      //  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
      //  animation.events.on("animationprogress", updateLines)
    }

    chart.events.on("datavalidated", function() {
      setTimeout(function() {
        selectSlice(pieSeries.dataItems.getIndex(0));
      }, 1000);
    });

    // Add legend
    chart.legend = new am4charts.Legend();

    this.container = container;
  }
  mounted() {
    this.budgetPie();
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
