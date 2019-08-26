import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformString'
})
export class TransformStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${value.split(',')[0]}, ${value.split(',')[1]}`;
  }

}
