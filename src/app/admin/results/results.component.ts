import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Group } from 'src/app/shared/entity.interface';
import { Test } from './../entity.interface';
import { ResultsService } from './results.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  listGroups: Group[] = [];
  listTests: Test[] = [];
  searchForm: FormGroup;
  constructor(private fb: FormBuilder,
    private resultsService: ResultsService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.resultsService.getListGroup().subscribe(result => { 
      this.listGroups = result;
    },  () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
    this.resultsService.getListTest().subscribe(result => { 
      this.listTests = result;
    },  () => {
      this.modalService.openErrorModal('Помилка завантаження даних');
    });
    this.createForm();
  }

  private createForm() {
    this.searchForm = this.fb.group({
      'group_id': [this.listGroups, Validators.required],
      'test_id': [this.listTests, Validators.required],
    });
  }

}
