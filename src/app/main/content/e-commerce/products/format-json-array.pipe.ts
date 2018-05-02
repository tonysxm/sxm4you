import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatJsonArray'
})
export class FormatJsonArrayPipe implements PipeTransform {

  transform(categories: any, args?: any): any {
    if (categories === "\"[]\"") {
      return '--';
    }
    return JSON.parse(categories).map(x => ' ' + x.toString() );
  }

}
