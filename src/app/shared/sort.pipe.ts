import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any[], field: string, sortAscending: boolean): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        if (sortAscending) {
            return -1;
        } else return 1;
      } else if (a[field] > b[field]) {
        if (sortAscending) {
            return 1;
        } else return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}