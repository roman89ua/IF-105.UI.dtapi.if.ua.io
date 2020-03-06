import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable, from, forkJoin } from 'rxjs';
import { Results, TrueAnswers } from '../entity.interface';
import { Student } from 'src/app/shared/entity.interface';
import { IQuestion } from '../questions/questions';
import { Subject } from './../entity.interface'
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private apiService: ApiService) { }

  getListGroup(): Observable<any> {
    return this.apiService.getEntity('group');
  }

  getListTest(): Observable<any> {
    return this.apiService.getEntity('test');
  }

  getResultTestIdsByGroup(id: number): Observable<any> {
    return this.apiService.getResultTestIdsByGroup(id);
  }

  getRecordsByTestGroupDate(idTest: number, idGroup: number = null): Observable<any> {
    return this.apiService.getRecordsByTestGroupDate(idTest, idGroup);
  }

  getListStudentsBuGroup(id: number): Observable<any> {
    return this.apiService.getEntityByAction('Student', 'getStudentsByGroup', id);
  }
  /** GET fullname student by user_id */
  getFullNameStudent(id: number, list: Student[]): string {
    let currentUser: Student = null;
    for (const item of list) {
      if (+item.user_id === +id) {
        currentUser = item;
        break;
      }
    }
    return `${currentUser.student_surname} ${currentUser.student_name} ${currentUser.student_fname}`;
  }
  getSubjectName(id: number): Observable<any> {
    return this.apiService.getEntity('subject', id).pipe(map( elem => elem[0].subject_name));
  } 
  /** Get duration test */
  getDurationTest(date: string, startTime: string, endTime: string): string {
    const startDate = `${date} ${startTime}`;
    const endDate = `${date} ${endTime}`;
    const duration = Date.parse(endDate) - Date.parse(startDate);
    return this.msToTime(duration);
  }

  private msToTime(duration: number): string {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return `${(hours < 10) ? '0' + hours : hours}:${(minutes < 10) ? '0' +
      minutes : minutes}:${(seconds < 10) ? '0' + seconds : seconds}`;
  }

  /** GET max result each students by group */
  getMaxResultStudents(list: Results[]): Results[] {
    const filtered: Results[] = [];
    for (const item of list) {
      const index = filtered.findIndex(elem => elem.student_id === item.student_id);
      if (index < 0) {
        filtered.push(item);
      } else {
        if (+filtered[index].result < +item.result) {
          filtered[index] = item;
        }
      }
    }
    return filtered;
  }
  /** GET min result each students by group */
  getMinResultStudents(list: Results[]): Results[] {
    const filtered: Results[] = [];
    for (const item of list) {
      const index = filtered.findIndex(elem => elem.student_id === item.student_id);
      if (index < 0) {
        filtered.push(item);
      } else {
        if (+item.result < +filtered[index].result) {
          filtered[index] = item;
        }
      }
    }
    return filtered;
  }
  /** Calculate rating question by group */
  calculateRatingQuestion(listResult: Results[]): Map<string, [number, number]> {
    /** key: question_id, value: [ count question, count true answers] */
    const answers = new Map();
    for (const result of listResult) {
      const trueAnswers = JSON.parse(result.true_answers);
      for (const question of trueAnswers) {
        if (answers.has(+question.question_id)) {
          const counterTrueAnswer = answers.get(+question.question_id)[1] + (+question.true);
          const counterQuestion = answers.get(+question.question_id)[1] + 1;
          answers.set(+question.question_id, [counterQuestion, counterTrueAnswer]);
        } else {
          answers.set(+question.question_id, [1, +question.true] );
        }
      }
    }
    return answers;
  }
  /** Get detail by current test */
  getDetailResult(detail: string): TrueAnswers[] {
    return  JSON.parse(detail);
  }
  /** Get all questions by test for id */
  getQuestions(list: number[]): Observable<any> {
    return this.apiService.getByEntityManager('Question', list);
  }
  /** Get question text for id */
  getTextQuestion(listQuestion: IQuestion[], id: number): string {
    return listQuestion.find(item => +item.question_id === +id).question_text;
  }
  /** Get Question by id */
  getQuestionWithAnswers(id: number): Observable<any> {
    return forkJoin(
      this.apiService.getEntity('Question', id),
      this.apiService.getAnswersByQuestion(id));
  }
}
