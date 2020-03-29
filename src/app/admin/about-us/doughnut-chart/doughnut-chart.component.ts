import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../about-us.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartType = 'doughnut';

  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit() {
    this.getDataForChart();
  }

  private getDataForChart() {
    this.aboutUsService.getLanguageData().subscribe((result: any) => {
      this.doughnutChartData = Object.values(result);
      this.doughnutChartLabels = Object.keys(result);
    });
  }

}
