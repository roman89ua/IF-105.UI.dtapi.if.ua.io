import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreAnswer'
})
export class ScoreAnswerPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    if (value) {
      return 'Правильна';
    } else {
      return 'Неправильна';
    }
  }

}
