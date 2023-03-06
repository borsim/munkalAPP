import { Injectable } from '@angular/core';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class SearchbarService {
  searchbarText: string = '';

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
}
