import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { LevelResultsChartService } from './level-results-chart.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Results } from '../../entity.interface';
import { MatTable } from '@angular/material/table';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-level-results-chart',
  templateUrl: './level-results-chart.component.html',
  styleUrls: ['./level-results-chart.component.scss']
})

export class LevelResultsChartComponent implements OnInit {

  @ViewChild('table', { static: true }) table: MatTable<Results>;

  constructor(
    private chartService: LevelResultsChartService,
    public dialogRef: MatDialogRef<LevelResultsChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        },
        scaleLabel: {
          display: true,
          labelString: 'Кількість балів'
        }
      }],
    }
  };

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Набрано балів' },
    { data: [], label: 'Максимальна кількість балів' }
  ];
  testList = this.data.testList.filter(element => element.test_id === this.data.results.test_id)[0];
  ngOnInit() {
    forkJoin(
      this.chartService.getTestDetail(this.data.results.test_id),
      this.chartService.getCorrectAnswers(this.data.results.true_answers)
    ).subscribe((result) => {
      this.barChartLabels = this.chartService.getLabelsArr(result[0]);
      this.barChartData[1].data = this.chartService.getMaxRatesArr(result[0]);
      this.barChartData[0].data = this.chartService.getRatesArr
        (result[0], this.chartService.getTrueAnswersbyLevel(result[0], result[1]));
    });
  }
}
