import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Statistic } from 'src/app/models/statistic';

@Component({
  selector: 'app-cases-stat',
  templateUrl: './cases-stat.component.html',
  styleUrls: ['./cases-stat.component.scss']
})
export class CasesStatComponent implements OnInit {
   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Positive', 'Sales'], ['label: this.label'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  stats: Statistic[] = [];
  label = 'Positive';
  isLoadingResults = true;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [], backgroundColor: [], label: this.label }];

  constructor(private api: ApiService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.getStatistic(this.label);
    this.changeStatus();
  }

  getStatistic(status: string) {
    this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
    this.barChartLabels = [];
    this.api.getStatistic(status)
    .subscribe((res: any) => {
      this.stats = res;
      const chartdata: number[] = [];
      const chartcolor: string[] = [];
      this.stats.forEach((stat) => {
        this.barChartLabels.push(stat._id.date);
        chartdata.push(stat.count);
        if (this.label === 'Positive') {
          chartcolor.push('rgba(255, 165, 0, 0.5)');
        } else if (this.label === 'Dead') {
          chartcolor.push('rgba(255, 0, 0, 0.5)');
        } else {
          chartcolor.push('rgba(0, 255, 0, 0.5)');
        }
      });
      this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.label }];
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  changeStatus() {
    this.isLoadingResults = true;
    this.getStatistic(this.label);
  }
}
