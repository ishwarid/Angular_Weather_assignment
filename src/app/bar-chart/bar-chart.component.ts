import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { HomeComponent } from "./../home/home.component";
import { ViewEncapsulation } from "@angular/core";
declare var google, L, $;
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  // @ViewChild("bar_chart")
  // bar_chart: ElementRef;
  // @Input()
  // set dataColChart(dataColChart: HomeComponent) {
  //   this._dataColChart = dataColChart || null;
  //   this.drawChart();
  // }
  // get dataColChart(): HomeComponent {
  //   return this._dataColChart;
  // }
  constructor() { }

  // drawChart() {
  //   const colChartOptions = {
  //     chartArea: { width: "90%", height: "60%" },
  //     fontName: "Poppins,Arial,sans-serif",
  //     legend: { position: "bottom" },
  //     bar: { groupWidth: "65%" },
  //     hAxis: {
  //       slantedText: true,
  //       slantedTextAngle: 70
  //     },
  //     animation: {
  //       duration: 2000,
  //       easing: "out",
  //       startup: true
  //     },
  //     series: {
  //       0: {
  //         color: "rgb(111, 219, 136)"
  //       }
  //     }
  //   };
  //   // Create bar chart
  //   const colChart = new google.visualization.ColumnChart(
  //     document.getElementById("bar_chart_crops")
  //   );
  //   colChart.draw(this._dataColChart, colChartOptions);
  // }


}
