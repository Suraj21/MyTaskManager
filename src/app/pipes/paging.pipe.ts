import { Project } from './../models/project';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paging'
})
export class PagingPipe implements PipeTransform {

  transform(value: Project[], ...args: unknown[]): unknown {
    if(value == null)
            return null;
    let resultArray = [];
    let currentPageIndex = args[0] as number;
    let pageSize = args[1] as number;

    for(let  i = currentPageIndex*pageSize; i < (currentPageIndex + 1) * pageSize; i++) {
        if(value[i]) {
          resultArray.push(value[i]);
        }
    }
    return resultArray;
  }

}
