import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-group-raiting',
  templateUrl: './result-group-raiting.component.html',
  styleUrls: ['./result-group-raiting.component.scss']
})
export class ResultGroupRaitingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResultGroupRaitingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  public barChartLabels: string[];
  public barChartType  = 'bar';
  public barChartLegend = true;
  public barChartData;
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        gridLines: {
          zeroLineColor: 'black',
          zeroLineWidth: 1
        },
        ticks: {
          min: 0,
          max: 100
        },
        scaleLabel: {
          display: true,
          labelString: 'Успішність студента,(%)'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: `Ім'я студента`
        }
      }]
    }
  };

  ngOnInit() {
    this.chartData();
  }

  chartData() {
    const studentName: string[] = this.data.data.map(name => name.student);
    this.barChartLabels = [...studentName];
    const inPercentage: number[] = this.data.data.map(tVel => tVel.score);
    const data: number[] = inPercentage;
    this.barChartData = [{
      data,
      label: 'Успішність студентів групи',
      minBarLength: 0
    }];
  }
}
