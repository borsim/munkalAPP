import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, filterStatuses: string[], filterCreatedByUser: string): any[] {
    if (!items) return [];
    if (!filterStatuses) {
      return [];
    } else {
      items = items.filter((it) => {
        return (filterStatuses.includes(it.orderStatus))
      })
    }
    if (filterCreatedByUser !== '') {
      items = items.filter((it) => {
        return (filterCreatedByUser === it.createdByUser)
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
        it.handoverState.toLowerCase().includes(searchText)
      );
    });
  }
}
