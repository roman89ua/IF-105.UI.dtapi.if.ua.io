import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeTable'
})
export class TimeTablePipe implements PipeTransform {

  transform(value: any): any {
    const h = value.substr(0, 2);
    const m = value.substr(3, 2);
    return `${h}:${m}`;
  }

}
