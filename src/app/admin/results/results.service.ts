import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import { Test, Results,TrueAnswers, QuestionsByTest } from './../entity.interface';
import { Student } from 'src/app/shared/entity.interface';
import { IQuestion } from '../questions/questions';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private apiService: ApiService,) { }

  getListGroup(): Observable<any> {
    return this.apiService.getEntity('group');
  }

  getListTest(): Observable<any> {
    return this.apiService.getEntity('test');
  }

  getResultTestIdsByGroup(id_group: number): Observable<any> {
    return this.apiService.getResultTestIdsByGroup(id_group);
  }

  getRecordsByTestGroupDate(test_id: number, group_id: number): Observable<any> {
    return this.apiService.getRecordsByTestGroupDate(test_id, group_id);
  }

  getListStudentsBuGroup(group_id: number): Observable<any>{
    return this.apiService.getEntityByAction('Student', 'getStudentsByGroup', group_id);
  }
  /** GET fullname student by user_id */
  getFullNameStudent(user_id: number, list: Student[]): string {
    let currentUser: Student = null;
    for (let item of list) {
      if (+item.user_id == user_id) {
        currentUser = item;
      }
    }
    return `${currentUser.student_surname} ${currentUser.student_name} ${currentUser.student_fname}`;
  }
  /** Get duration test */
  getDurationTest(date: string, start_time: string, end_time:string): string {
    let startDate = `${date} ${start_time}`;
    let endDate = `${date} ${end_time}`;
    let duration = Date.parse(endDate) - Date.parse(startDate);
    return this.msToTime(duration);
  }

  private msToTime(duration: number) : string{
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24); 
    return `${(hours < 10) ? "0" + hours : hours}:${(minutes < 10) ? "0" + minutes : minutes}:${(seconds < 10) ? "0" + seconds : seconds}`;
  }

  /** GET max result each students by group */
  getMaxResultStudents(list: Results[]): Results[] {
    let filtered: Results[] = [];
    for (let item of list) {
      let index = filtered.findIndex(elem => elem.student_id === item.student_id);
      if (index < 0) {
        filtered.push(item);
      }
      else {
        if (+filtered[index].result < +item.result) {
          filtered[index] = item;
        }
      }
    }
    return filtered;
  }
  /** GET min result each students by group */
  getMinResultStudents(list: Results[]): Results[] {
    let filtered: Results[] = [];
    for (let item of list) {
      let index = filtered.findIndex(elem => elem.student_id === item.student_id);
      if (index < 0) {
        filtered.push(item);
      }
      else {
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
    let answers = new Map();
    for (let result of listResult) {
      let true_answers = JSON.parse(result.true_answers);
      console.log(typeof( true_answers));
      for (let question of true_answers) {
        if (answers.has(+question.question_id)) {
          let counterTrueAnswer = answers.get(+question.question_id)[1] + (+question.true);
          let counterQuestion = answers.get(+question.question_id)[1] + 1 
          answers.set(+question.question_id, [counterQuestion, counterTrueAnswer]);
        } else {
          answers.set(+question.question_id, [1, +question.true] );
        }
      }
    }
    return answers;
  }
  /**  */
  getDetailResult(detail: string): any {
    console.log(detail);
    let true_answers: TrueAnswers[] = JSON.parse(detail);
    return true_answers;
  }

  getQuestions(list: number[]): Observable<any> {
    return this.apiService.getByEntityManager('Question', list);
  }

  getTextQuestion(listQuestion: IQuestion[], question_id: number): string {
    return listQuestion.find(item => item.question_id === question_id).question_text;
  }
}
