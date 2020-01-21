import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionType'
})
export class QuestionTypePipe implements PipeTransform {

  transform(value: number): string {
    switch(+value) {
      case 1: return 'Простий вибір';
      case 2: return 'Мульти вибір';
      case 3: return 'Teкстовий';
      case 4: return 'Числове поле вводу';
    }
  }

}
