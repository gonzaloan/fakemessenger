import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    }

    if (!args) {
      return value;
    }

    args = args.toLowerCase();
    return value.filter((item) => {
      // Tomar el string y chequear si incluye el valor que viene en args
      return JSON.stringify(item).toLowerCase().includes(args);
    });

  }

}
