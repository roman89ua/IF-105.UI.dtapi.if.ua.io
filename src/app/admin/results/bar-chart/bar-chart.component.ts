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
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType  = 'bar';
  public barChartLegend = true;
  //public barChartData;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  //public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  //public barChartType = 'bar';
  //public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'sucsses'},
  ];
  //private getData() {
  //  let data = this.resultsService();
  //}

  ngOnInit() {
    console.log(this.data.data);
    let dataChart = this.resultsService.calculateRatingQuestion(this.data.data);
    this.barChartLabels = [...dataChart.keys()];
    let values = [...dataChart.values()];
    let data: number[] = values.map(item => item[1]/item[0]);
    this.barChartData = [{
      data,
      label: 'Якість'
    }]

  }

}
