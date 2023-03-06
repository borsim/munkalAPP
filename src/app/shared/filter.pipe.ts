import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log(items);
    console.log(searchText);
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return (
        it.description.toLowerCase().includes(searchText) ||
        it.task.toLowerCase().includes(searchText) ||
        it.email.toLowerCase().includes(searchText) ||
        it.customerName.toLowerCase().includes(searchText) ||
        it.notes.toLowerCase().includes(searchText) ||
        it.name.toLowerCase().includes(searchText)
      );
    });
  }
}
