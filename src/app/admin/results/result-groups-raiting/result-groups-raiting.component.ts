import { Component, OnInit, Inject } from '@angular/core';
import { ResultsService } from '../results.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Results, Student, Group } from 'src/app/shared/entity.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-result-groups-raiting',
  templateUrl: './result-groups-raiting.component.html',
  styleUrls: ['./result-groups-raiting.component.scss']
})
export class ResultGroupsRaitingComponent implements OnInit {

  public groupNames = [];
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
    this.getDataForChart();
  }

  private getDataForChart() {
    this.getScoreForChart();
    this.getGroupNamesForChart();
  }

  private async getTestResultsList() {
    const promise: any = this.resultsService.getRecordsByTestGroupDate(this.data.testID).toPromise();
    return Promise.resolve(promise);
  }

  private async getStudentsList() {
    const testResultsList = [...new Set(await this.getTestResultsList())];
    const requestArray: number[] = [];
    testResultsList.forEach((value: Results) => {
      requestArray.push(value.student_id);
    });
    const promise: any = this.apiService.getByEntityManager('Student', requestArray).toPromise();
    return Promise.resolve(promise);
  }

  private async getGroupsResults() {
    const studentsList = [...new Set(await this.getStudentsList())];
    let groupIds: number[] = [];
    studentsList.forEach((value: Student) => {
      groupIds.push(value.group_id);
    });
    groupIds = [...new Set(groupIds)];
    return groupIds;
  }

  private async getGroupNamesForChart() {
    const groupIds = [...new Set(await this.getGroupsResults())];
    this.apiService.getByEntityManager('Group', groupIds).subscribe((data: Group[]) => {
      data.forEach((value: Group) => {
        this.groupNames.push(value.group_name);
      });
    });
  }

  private async getScoreForChart() {
    const groupIds = [...new Set(await this.getGroupsResults())];
    groupIds.forEach((value: number) => {
      this.resultsService.getRecordsByTestGroupDate(this.data.testID, value).subscribe((data: Results[]) => {
        let groupResult = 0;
        data.forEach((item: Results) => {
          groupResult += (Number(item.result) / Number(item.answers) * 100);
        });
        groupResult = Math.round(groupResult / data.length);
        this.score.push(groupResult);
      });
    });
    this.chardReady = true;
    this.isLoading = false;
    this.chartData();
  }

  chartData() {
    this.barChartLabels = this.groupNames;
    const data: number[] = this.score;
    this.barChartData = [{
      data,
      label: 'Успішність студентів групи',
      minBarLength: 0
    }];
  }
}
