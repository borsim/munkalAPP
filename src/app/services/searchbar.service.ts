import { Injectable,  } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class SearchbarService {
  private searchbarText: string = '';
  private sortField: string = '';
  private sortAscending: boolean = false;

  public sbtSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public sortSubject: BehaviorSubject<[string, boolean]> = new BehaviorSubject(['', false] as [string, boolean]);


  setSearchString(sbtxt: string) {
    this.searchbarText = sbtxt;
    this.sbtSubject.next(this.searchbarText); 
  }

  getSearchString() {
    return this.sbtSubject.asObservable();
  }

  clearSearchString() {
    this.searchbarText = '';
    this.sbtSubject.next(this.searchbarText); 
    return this.sbtSubject.asObservable();
  }

  setSortField(sortField: string) {
    this.sortField = sortField;
    console.log(this.sortField);
    this.sortSubject.next([this.sortField, this.sortAscending]); 
  }
  
  setAscending(ascending: boolean) {
    this.sortAscending = ascending;
    console.log(this.sortAscending);
    this.sortSubject.next([this.sortField, this.sortAscending]); 
  }

  getSortTuple() {
    return this.sortSubject.asObservable();
  }

}
