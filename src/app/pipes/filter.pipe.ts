
import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: Project[], ...args: unknown[]): Project[] {
    if(value == null) {
      return value;
    }

    let resultArray = [];
    for(let item of value) {
      if(String(item[args[0] as string]).toLowerCase().indexOf((args[1] as string).toLowerCase()) >= 0) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
