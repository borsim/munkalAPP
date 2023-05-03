import { Injectable } from '@angular/core';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class SearchbarService {
  searchbarText: string = '';
  sortField: string = '';
  sortAscending: boolean = false;

  setSearchString(sbtxt: string) {
    this.searchbarText = sbtxt;
  }

  getSearchString() {
    return this.searchbarText;
  }

  clearSearchString() {
    this.searchbarText = '';
    return this.searchbarText;
  }

  setSortField(sortField: string) {
    this.sortField = sortField;
    console.log(this.sortField);
  }
  getSortField() {
    return this.sortField;
  }

  setAscending(ascending: boolean) {
    this.sortAscending = ascending;
    console.log(this.sortAscending);
  }
  getAscending() {
    return this.sortAscending;
  }

}
