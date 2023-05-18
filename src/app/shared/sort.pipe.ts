import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any[] | null, field: string | null, sortAscending: boolean | null): any[] | null {
    if (array === null || field === null || sortAscending === null) return null;
    if (field === '') return array;
    array.sort((a: any, b: any) => {
      var _a = a[field];
      var _b = b[field];
      if (typeof(_a) === 'string') {
        _a = (_a as string).toLocaleLowerCase();
        _b = (_b as string).toLocaleLowerCase();
      }
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