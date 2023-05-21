import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any[] | null, field: string | null, sortAscending: boolean | null): any[] | null {
    if (array === null) return null;
    if (field === null) field = 'creationTime';
    if (sortAscending === null) sortAscending = false;
    if (field === '') return array;
    if (field === 'name') {
      if (sortAscending) {
        return array.sort((a, b) => a[field!].localeCompare(b[field!], "hu", { ignorePunctuation: true }));
      } else {
        return array.sort((a, b) => b[field!].localeCompare(a[field!], "hu", { ignorePunctuation: true }));
      }
    } 
    array.sort((a: any, b: any) => {
      var _a = a[field!];
      var _b = b[field!];
      if (_a < _b) {
        if (sortAscending) {
            return -1;
        } else return 1;
      } else if (_a > _b) {
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