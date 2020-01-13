import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) { }

  testId: number;

  test: {}

  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');

    this.testService.getTest(this.testId)
      .subscribe((res) => { this.test = res; console.log(res) })
  }

}
