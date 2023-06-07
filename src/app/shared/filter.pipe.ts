import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, filterDone: boolean): any[] {
    if (!items) return [];
    if (!filterDone) {
      items = items.filter((it) => {
        return (it.orderStatus !== 'done' && it.orderStatus !== 'canceled')
      })
    }
    if (searchText === '') return items;
    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      return (
        it.name.toLowerCase().includes(searchText) ||
        it.casingNumber.toLowerCase().includes(searchText) ||
        it.description.toLowerCase().includes(searchText) ||
        it.originalState.toLowerCase().includes(searchText) ||
        it.customerName.toLowerCase().includes(searchText) ||
        it.telephoneNumber.toLowerCase().includes(searchText) ||
        it.email.toLowerCase().includes(searchText) ||
        it.task.toLowerCase().includes(searchText) ||
        it.notes.toLowerCase().includes(searchText) ||
        it.doneTasks.toLowerCase().includes(searchText) ||
        it.guarantee.toLowerCase().includes(searchText) ||
        it.handoverState.toLowerCase().includes(searchText)
      );
    });
  }
}
