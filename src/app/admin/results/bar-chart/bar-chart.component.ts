import { Component, OnInit, Inject } from '@angular/core';
import { ResultsService } from '../results.service'
import { Results } from '../../entity.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor(public resultsService: ResultsService,
    public dialogRef: MatDialogRef<BarChartComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      dialogRef.disableClose = true;
  }

  listResults: Results[];
  public barChartLabels: string[];
  public barChartType  = 'bar';
  public barChartLegend = true;
  public barChartData;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
        },
      }]
    }
  };

  ngOnInit() {
    console.log(this.data.data);
    let dataChart = this.resultsService.calculateRatingQuestion(this.data.data);
    this.barChartLabels = [...dataChart.keys()];
    let values = [...dataChart.values()];
    let data: number[] = values.map(item => item[1] / item[0] * 100);
    this.barChartData = [{
      data,
      label: 'Якість',
      minBarLength: 0
    }]
  }

}
