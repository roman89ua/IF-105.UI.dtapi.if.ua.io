import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Group } from 'src/app/shared/entity.interface';
import { Test, Results } from './../entity.interface';
import { ResultsService } from './results.service';
import { ModalService } from '../../shared/services/modal.service';
import { MatTable, MatTableDataSource } from '@angular/material';
import { GetStudentsInterface } from '../students/interfaces/get-students-interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  //isLoading = true;
  listGroups: Group[] = [];
  listTests: Test[] = [];
  listTestsByGroup: Test[] = [];
  listResults: Results[];
  listStudents: GetStudentsInterface[] = [];
  searchForm: FormGroup;
  groupId: FormControl;
  dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = [
    'id',
    'student',
    'result',
    'date',
    'start_time',
    'duration',
    'details',
  ];

  @ViewChild('table', { static: true }) table: MatTable<Element>;

  constructor(private fb: FormBuilder,
    private resultsService: ResultsService,
    private modalService: ModalService) {}

  ngOnInit() {
    this.getAllGroups();
    this.getAllTests();
    this.createForm();
    this.onChangeFieldGroupId();
  }
  /** Get all groups */
  private getAllGroups() {
    this.resultsService.getListGroup().subscribe(result => { 
      this.listGroups = result;
    },  () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }
  /** Get all test */
  private getAllTests() {
    this.resultsService.getListTest().subscribe(result => { 
      this.listTests = result;
      this.listTestsByGroup = this.listTests;
    },  () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }
  /** handler for change field form "groupId" */
  private onChangeFieldGroupId() {
    this.groupId.valueChanges.subscribe( group_id => {
      this.getTestsByGroup(group_id);
    });
  }
  /** Get all tests for current group */
  private getTestsByGroup(group_id: number) {
    this.resultsService.getResultTestIdsByGroup(group_id).subscribe(result => {
      if (result.response) {
        this.listTestsByGroup = [];
      } else {
        this.listTestsByGroup = this.listTests.filter(item1 => 
          result.some(item2 => item2.test_id === item1.test_id )
        );
      }
    }, () => {
        this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }
  /** Get list students by group */
  private getStudentsByGroup(group_id: number) {
    this.resultsService.getListStudentsBuGroup(group_id).subscribe((result: any) => {
      if (result === 'no records') {
        return;
      }
      this.listStudents = result;
      //this.isLoading = false;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }

  /** Get result checked test by group */
  private getResultByTestIdAndGroupId(test_id: number, group_id: number) {
    this.resultsService.getRecordsByTestGroupDate(test_id, group_id).subscribe( result => {
      if (result === 'no records') {
        return;
      }
      this.dataSource.data = result;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }

  /** Create form for check result by current test */
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
    this.getStudentsByGroup(group_id);
    this.getResultByTestIdAndGroupId(test_id, group_id);
  }

}
