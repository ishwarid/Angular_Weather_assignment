import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

import { FormControl } from "@angular/forms";
import { BackendService } from '../BackendServices';
import { ArrayDataSource } from '@angular/cdk/collections';

declare var google, L, $;
export interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startDate = moment().add(-24, "months");
  endDate = moment().add(2, "months");
  startDateJs = this.startDate;
  endDateJs = this.endDate;
  selectedLocRain = "UK";
  selectedLocMin = "UK";
  selectedLocMax = "UK";
  location = this.selectedLocRain;
  metric: string;
  metricData = [];
  locations: Location[] = [
    { value: 'UK', viewValue: 'UK' },
    { value: 'England', viewValue: 'England' },
    { value: 'Scotland', viewValue: 'Scotland' },
    { value: 'Wales', viewValue: 'Wales' }
  ];

  static yearMonthToMoment(yearMonth: number): moment.Moment {
    return moment({
      year: yearMonth / 100,
      month: yearMonth % 100
    });
  }

  constructor(public backendService: BackendService) {
    console.log("this.startDate", this.startDate);
    console.log(" this.endDate", this.endDate);

  }



  dateChanged(change_type, event) {
    const modified_date = moment(event.value);
    if (change_type === "start") {
      this.startDate = modified_date;
    } else if (change_type === "end") {
      this.endDate = modified_date;
    }
    this.loadRainCharts();
    this.loadTminCharts();
    this.loadTmaxCharts();

    console.log("this.startDate", this.startDate);
    console.log(" this.endDate", this.endDate);
  }


  loadRainCharts() {
    this.metric = "Rainfall";

    this.backendService.getData(this.metric, this.location).subscribe(data => {

      // console.log("data", data);
      const start = this.startDate;
      const end = this.endDate;
      // console.log("data", Array.isArray(data));
      let dateToConvert;
      // console.log("this.startDate", this.startDate);
      const filteredData = data.filter(function (d) {
        if (d.month > 9) {
          dateToConvert = Number(d.year + '' + (d.month - 1));
        } else {
          dateToConvert = Number(d.year + '0' + (d.month - 1));
        }

        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        // console.log("d", d);
        // console.log("convertedDate", convertedDate);

        if (convertedDate > start && convertedDate < end) {
          return d;
        }
      });
      const chartData = new google.visualization.DataTable();
      chartData.addColumn("date", "Date");
      chartData.addColumn("number", "(mm) Rain Fall");
      chartData.addColumn({ type: "string", role: "tooltip" });

      console.log("filteredData", filteredData);
      const aggregateChartObj = this.aggregateChartData(
        this.startDate,
        this.endDate
      );
      filteredData.forEach(val => {
        if (val.month > 9) {
          dateToConvert = Number(val.year + '' + (val.month - 1));
        } else {
          dateToConvert = Number(val.year + '0' + (val.month - 1));
        }
        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        const hash = aggregateChartObj.hash_func(convertedDate);

      });

      for (let i = 0; i < filteredData.length; i++) {
        console.log("=======================", filteredData[i]);
        if (filteredData[i]['month'] > 9) {
          dateToConvert = Number(filteredData[i]['year'] + '' + (filteredData[i]['month'] - 1));
        } else {
          dateToConvert = Number(filteredData[i]['year'] + '0' + (filteredData[i]['month'] - 1));
        }
        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        const tooltip_text = aggregateChartObj.tooltip_func(
          convertedDate,
          filteredData[i]['value'].toString() +
          " (mm)"
        );

        chartData.addRow([new Date(convertedDate.format("MM/DD/YYYY")), filteredData[i]['value'], tooltip_text]);
      }


      // const options = {
      //   hAxis: {

      //   },
      //   // backgroundColor: "#f1f8e9"
      // };

      const colChartOptions = {
        chartArea: { width: "90%", height: "60%" },
        fontName: "Poppins,Arial,sans-serif",
        legend: { position: "top" },
        bar: { groupWidth: "40%" },
        hAxis: {
          slantedText: true,
          slantedTextAngle: 70
        },
        animation: {
          duration: 2000,
          easing: "out",
          startup: true
        },
        series: {
          0: {
            color: "#b8e149"
          }
        }
      };

      const chart = new google.visualization.ColumnChart(
        document.getElementById("chart_div")
      );

      chart.draw(chartData, colChartOptions);
    });

  }
  loadTminCharts() {
    this.metric = "Tmin";

    this.backendService.getData(this.metric, this.location).subscribe(data => {

      // console.log("data", data);
      const start = this.startDate;
      const end = this.endDate;
      // console.log("data", Array.isArray(data));
      let dateToConvert;
      // console.log("this.startDate", this.startDate);
      const filteredData = data.filter(function (d) {
        if (d.month > 9) {
          dateToConvert = Number(d.year + '' + (d.month - 1));
        } else {
          dateToConvert = Number(d.year + '0' + (d.month - 1));
        }

        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        // console.log("d", d);
        // console.log("convertedDate", convertedDate);

        if (convertedDate > start && convertedDate < end) {
          return d;
        }
      });
      const chartData = new google.visualization.DataTable();
      chartData.addColumn("date", "Date");
      chartData.addColumn("number", "(min temperature) Temprature");
      chartData.addColumn({ type: "string", role: "tooltip" });

      console.log("filteredData", filteredData);
      const aggregateChartObj = this.aggregateChartData(
        this.startDate,
        this.endDate
      );
      filteredData.forEach(val => {
        if (val.month > 9) {
          dateToConvert = Number(val.year + '' + (val.month - 1));
        } else {
          dateToConvert = Number(val.year + '0' + (val.month - 1));
        }
        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        const hash = aggregateChartObj.hash_func(convertedDate);

      });

      for (let i = 0; i < filteredData.length; i++) {
        console.log("=======================", filteredData[i]);
        if (filteredData[i]['month'] > 9) {
          dateToConvert = Number(filteredData[i]['year'] + '' + (filteredData[i]['month'] - 1));
        } else {
          dateToConvert = Number(filteredData[i]['year'] + '0' + (filteredData[i]['month'] - 1));
        }
        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        const tooltip_text = aggregateChartObj.tooltip_func(
          convertedDate,
          filteredData[i]['value'].toString() +
          " (min temperature)"
        );

        chartData.addRow([new Date(convertedDate.format("MM/DD/YYYY")), filteredData[i]['value'], tooltip_text]);
      }


      // const options = {
      //   hAxis: {

      //   },
      //   // backgroundColor: "#f1f8e9"
      // };

      const colChartOptions = {
        chartArea: { width: "90%", height: "60%" },
        fontName: "Poppins,Arial,sans-serif",
        legend: { position: "top" },
        bar: { groupWidth: "40%" },
        hAxis: {
          slantedText: true,
          slantedTextAngle: 70
        },
        animation: {
          duration: 2000,
          easing: "out",
          startup: true
        },
        series: {
          0: {
            color: "#6fdb88"
          }
        }
      };

      const chart = new google.visualization.ColumnChart(
        document.getElementById("chart_div_tmin")
      );

      chart.draw(chartData, colChartOptions);
    });

  }
  loadTmaxCharts() {
    this.metric = "Tmax";

    this.backendService.getData(this.metric, this.location).subscribe(data => {

      // console.log("data", data);
      const start = this.startDate;
      const end = this.endDate;
      // console.log("data", Array.isArray(data));
      let dateToConvert;
      // console.log("this.startDate", this.startDate);
      const filteredData = data.filter(function (d) {
        if (d.month > 9) {
          dateToConvert = Number(d.year + '' + (d.month - 1));
        } else {
          dateToConvert = Number(d.year + '0' + (d.month - 1));
        }

        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        // console.log("d", d);
        // console.log("convertedDate", convertedDate);

        if (convertedDate > start && convertedDate < end) {
          return d;
        }
      });
      const chartData = new google.visualization.DataTable();
      chartData.addColumn("date", "Date");
      chartData.addColumn("number", "(max temperature) Temprature");
      chartData.addColumn({ type: "string", role: "tooltip" });

      console.log("filteredData", filteredData);
      const aggregateChartObj = this.aggregateChartData(
        this.startDate,
        this.endDate
      );
      filteredData.forEach(val => {
        if (val.month > 9) {
          dateToConvert = Number(val.year + '' + (val.month - 1));
        } else {
          dateToConvert = Number(val.year + '0' + (val.month - 1));
        }
        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        const hash = aggregateChartObj.hash_func(convertedDate);

      });

      for (let i = 0; i < filteredData.length; i++) {
        console.log("=======================", filteredData[i]);
        if (filteredData[i]['month'] > 9) {
          dateToConvert = Number(filteredData[i]['year'] + '' + (filteredData[i]['month'] - 1));
        } else {
          dateToConvert = Number(filteredData[i]['year'] + '0' + (filteredData[i]['month'] - 1));
        }
        const convertedDate = HomeComponent.yearMonthToMoment(dateToConvert);
        const tooltip_text = aggregateChartObj.tooltip_func(
          convertedDate,
          filteredData[i]['value'].toString() +
          " (max temperature)"
        );

        chartData.addRow([new Date(convertedDate.format("MM/DD/YYYY")), filteredData[i]['value'], tooltip_text]);
      }


      // const options = {
      //   hAxis: {

      //   },
      //   // backgroundColor: "#f1f8e9"
      // };

      const colChartOptions = {
        chartArea: { width: "90%", height: "60%" },
        fontName: "Poppins,Arial,sans-serif",
        legend: { position: "top" },
        bar: { groupWidth: "40%" },
        hAxis: {
          slantedText: true,
          slantedTextAngle: 70
        },
        animation: {
          duration: 2000,
          easing: "out",
          startup: true
        },
        series: {
          0: {
            color: "#746c9f"
          }
        }
      };

      const chart = new google.visualization.ColumnChart(
        document.getElementById("chart_div_tmax")
      );

      chart.draw(chartData, colChartOptions);
    });

  }

  filterByLoc(metric: string) {

    console.log("UPDATED");


    if (metric === 'rainFall') {
      this.location = this.selectedLocRain;
      this.loadRainCharts();
    }
    if (metric === 'tMin') {
      this.location = this.selectedLocMin;
      this.loadTminCharts();

    }
    if (metric === 'tMax') {
      this.location = this.selectedLocMax;
      this.loadTmaxCharts();

    }

  }


  aggregateChartData(startDate, endDate) {
    const daysRange = this.endDate.diff(this.startDate, "days");
    let split_type;
    let formatting;
    let label_count;

    if (daysRange < 30) {
      split_type = "day";
      formatting = "dd MMM";
      label_count = daysRange;
    } else if (daysRange < 120) {
      split_type = "week";
      formatting = "dd MMM";
      label_count = daysRange / 7;
    } else if (daysRange < 600) {
      split_type = "month";
      formatting = "MMM";
      label_count = daysRange / 30;
    } else {
      split_type = "year";
      formatting = "yyyy";
      label_count = daysRange / 365;
    }

    // Hash functon depends on split type used.
    const hash_func = date =>
      date
        .startOf(split_type)
        .toDate()
        .toDateString();

    const tooltip_func = (date, value) => {
      if (split_type === "day") {
        return value + " on " + date.format("MMM YYYY");
      } else if (split_type === "week") {
        return (
          value +
          " in " +
          (date.format("MMM YYYY") +
            " - " +
            date
              .add(7, "days")
              .format("MMM YYYY"))
        );
      } else if (split_type === "month") {
        return value + " in " + date.format("MMM YYYY");
      }
      return value + " in " + date.format("MMM YYYY");
    };

    return {
      split_type: split_type,
      formatting: formatting,
      hash_func: hash_func,
      tooltip_func: tooltip_func,
      label_count: Math.min(label_count, 10)
    };
  }


  ngOnInit() {
    google.charts.load("current", { packages: ["corechart", "table"] });
    google.charts.setOnLoadCallback(() => {
      this.loadRainCharts();
      this.loadTminCharts();
      this.loadTmaxCharts();
    });

  }

}
