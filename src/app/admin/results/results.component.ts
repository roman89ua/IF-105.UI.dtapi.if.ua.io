import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Group, Student } from 'src/app/shared/entity.interface';
import { Test, Results } from '../entity.interface';
import { ResultsService } from './results.service';
import { ModalService } from '../../shared/services/modal.service';
import { MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { ResultRaitingQuestionComponent } from './result-raiting-question/result-raiting-question.component';
import { ResultDetailComponent } from './result-detail/result-detail.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  listGroups: Group[] = [];
  listTests: Test[] = [];
  listTestsByGroup: Test[] = [];
  listResults: Results[];
  listStudents: Student[] = [];
  searchForm: FormGroup;
  groupId: FormControl;
  dataSource = new MatTableDataSource<Results>();
  displayedColumns: string[] = [
    'id',
    'student',
    'rating',
    'score',
    'date',
    'start_time',
    'duration',
    'details',
  ];

  @ViewChild('table', { static: true }) table: MatTable<Results>;

  constructor(
    private fb: FormBuilder,
    public resultsService: ResultsService,
    private modalService: ModalService,
    public dialog: MatDialog) {}

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
    this.groupId.valueChanges.subscribe( id => {
      this.getTestsByGroup(id);
    });
  }
  /** Get all tests for current group */
  private getTestsByGroup(id: number) {
    this.resultsService.getResultTestIdsByGroup(id).subscribe(result => {
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
  private getStudentsByGroup(id: number) {
    this.resultsService.getListStudentsBuGroup(id).subscribe((result: any) => {
      if (result === 'no records') {
        return;
      }
      this.listStudents = result;
    }, () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
  }

  /** Get result checked test by group */
  private getResultByTestIdAndGroupId(idTest: number, idGroup: number) {
    this.resultsService.getRecordsByTestGroupDate(idTest, idGroup).subscribe( result => {
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
      group_id: this.groupId,
      test_id: [this.listTests, Validators.required],
    });
  }

  onSubmit() {
    const idGroup = this.searchForm.value.group_id;
    const idTest = this.searchForm.value.test_id;
    this.getStudentsByGroup(idGroup);
    this.getResultByTestIdAndGroupId(idTest, idGroup);
  }

  getMax(list: Results[]) {
    this.dataSource.data = this.resultsService.getMaxResultStudents(list);
  }

  createChart(): void {
    this.dialog.open(ResultRaitingQuestionComponent, {
      width: '1000px',
      data: {data: this.dataSource.data}
    });
  }

  openDetailResult(detail: string): void {
    this.dialog.open(ResultDetailComponent, {
      width: '1000px',
      data: {
        detail,
      }
    });
  }
}
