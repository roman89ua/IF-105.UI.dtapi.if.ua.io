import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Group } from 'src/app/shared/entity.interface';
import { Test, Results } from './../entity.interface';
import { ResultsService } from './results.service';
import { ModalService } from '../../shared/services/modal.service';
import { MatTable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  listGroups: Group[] = [];
  listTests: Test[] = [];
  listTestsFiltered: Test[] = [];
  listResults: Results[];
  searchForm: FormGroup;
  groupId: FormControl;
  dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = [
    'id',
    'student',
    'result',
    'date',
    'start_time',
    'details',
  ];

  @ViewChild('table', { static: true }) table: MatTable<Element>;

  constructor(private fb: FormBuilder,
    private resultsService: ResultsService,
    private modalService: ModalService) {}

  ngOnInit() {
    this.resultsService.getListGroup().subscribe(result => { 
      this.listGroups = result;
    },  () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
    this.resultsService.getListTest().subscribe(result => { 
      this.listTests = result;
      this.listTestsFiltered = this.listTests;
    },  () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
    this.createForm();
    this.groupId.valueChanges.subscribe( group_id => {
      this.getTestsByGroup(group_id);
    });
  }

  private getTestsByGroup(group_id: number) {
    this.resultsService.getResultTestIdsByGroup(group_id).subscribe(result => {
      if (result.response) {
        this.listTestsFiltered = [];
      } else {
        this.listTestsFiltered = this.listTests.filter(item1 => 
          result.some(item2 => item2.test_id === item1.test_id )
        );
      }
    }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }

  private createForm() {
    this.groupId = new FormControl([this.listGroups, Validators.required]);
    this.searchForm = this.fb.group({
      'group_id': this.groupId,
      'test_id': [this.listTests, Validators.required],
    });
  }

  onSubmit() {
    //let [ group_id, test_id ] = this.searchForm.value;
    let group_id = this.searchForm.value.group_id;
    let test_id = this.searchForm.value.test_id;
    this.resultsService.getRecordsByTestGroupDate(test_id, group_id).subscribe( result => {
      this.dataSource.data = result;
    });
  }
}
