import { Component, OnInit, Inject } from '@angular/core';
import { ResultsService } from '../results.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Results, Student, Group } from 'src/app/shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-result-groups-raiting',
  templateUrl: './result-groups-raiting.component.html',
  styleUrls: ['./result-groups-raiting.component.scss']
})
export class ResultGroupsRaitingComponent implements OnInit {

  public score = [];
  public chardReady = false;
  public isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ResultGroupsRaitingComponent>,
    private resultsService: ResultsService,
    private apiService: ApiService,
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
          labelString: 'Успішність групи,(%)'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: `Назва групи`
        }
      }]
    }
  };

  ngOnInit() {
    this.getDataForChart();
  }

  private getDataForChart() {
    this.getScoreForChart();
    this.getGroupNamesForChart();
  }

  private async getTestResultsList() {
    return this.resultsService.getRecordsByTestGroupDate(this.data.testID).toPromise();
  }

  private async getStudentsList() {
    const testResultsList: any = [...new Set(await this.getTestResultsList())];
    const requestArray: number[] = testResultsList.map(item => {
      return item.student_id;
    });
    return this.apiService.getByEntityManager('Student', requestArray).toPromise();
  }

  private async getGroupsResults() {
    const studentsList: any = await this.getStudentsList();
    let groupIds: number[] = [];
    groupIds = studentsList.map(item => {
      return item.group_id;
    });
    groupIds = [...new Set(groupIds)];
    return groupIds;
  }

  private async getGroupNamesForChart() {
    const groupIds = [...new Set(await this.getGroupsResults())];
    this.apiService.getByEntityManager('Group', groupIds).subscribe((data: Group[]) => {
      this.barChartLabels = data.map(item => {
        return item.group_name;
      });
    });
  }

  private async getScoreForChart() {
    const groupIds = [...new Set(await this.getGroupsResults())];
    groupIds.forEach((value: number) => {
      this.resultsService.getRecordsByTestGroupDate(this.data.testID, value).subscribe((data: Results[]) => {
        const score = Math.round((data.reduce((groupResult, item) => {
          return groupResult + (Number(item.result) / Number(item.answers) * 100);
        }, 0)) / data.length);
        this.score.push(score);
      });
    });
    this.chardReady = true;
    this.isLoading = false;
    this.chartData();
  }

  chartData() {
    const data: number[] = this.score;
    this.barChartData = [{
      data,
      label: 'Успішність групи',
      minBarLength: 0
    }];
  }
}
