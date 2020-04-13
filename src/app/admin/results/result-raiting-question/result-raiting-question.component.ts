import { Component, OnInit, Inject } from '@angular/core';
import { ResultsService } from '../results.service';
import { Results } from '../../entity.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './result-raiting-question.component.html',
  styleUrls: ['./result-raiting-question.component.scss']
})
export class ResultRaitingQuestionComponent implements OnInit {

  constructor(
    public resultsService: ResultsService,
    public dialogRef: MatDialogRef<ResultRaitingQuestionComponent>,
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
        gridLines: {
          zeroLineColor: 'black',
          zeroLineWidth: 1
        },
        ticks: {
          min: 0,
          max: 100,
        },
        scaleLabel: {
          display: true,
          labelString: 'Відсоток успішних відповідей'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Ідентифікатор запитання'
        }
      }]
    }
  };

  public falseQuestion: string[];

  ngOnInit() {
    const dataChart = this.resultsService.calculateRatingQuestion(this.data.data);
    this.falseQuestion = [... dataChart.entries()].filter(item => item[1][1] === 0)
      .map(item => item[0]).sort((a,b) => +a - +b);
    this.barChartLabels = [...dataChart.keys()].filter(item => !this.falseQuestion.includes(item));
    const values = [...dataChart.values()];
    const data: number[] = values.filter(item => item[1] !== 0).map(item => item[1] / item[0] * 100);
    this.barChartData = [{
      data,
      label: 'Успішність відповіді',
      minBarLength: 0
    }];

  }

}
