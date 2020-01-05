import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService) { }

  test: {}

  ngOnInit() {
    this.testService.getTest()
      .subscribe((res) => { this.test = res; console.log(res) })
  }

}
