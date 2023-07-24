import { Injectable,  } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class SearchbarService {
  private searchbarText: string = '';
  private sortField: string = 'creationTime';
  private sortAscending: boolean = false;
  private filterStatuses: string[] = ['registered', 'waiting for part', 'tasks done', 'ready for pickup'];

  public sbtSubject: BehaviorSubject<[string, string[]]> = new BehaviorSubject(['', this.filterStatuses] as [string, string[]]);
  public sortSubject: BehaviorSubject<[string, boolean]> = new BehaviorSubject(['creationTime', false] as [string, boolean]);


  setSearchString(sbtxt: string) {
    this.searchbarText = sbtxt;
    this.sbtSubject.next([this.searchbarText, this.filterStatuses]); 
  }

  getSearchTuple() {
    return this.sbtSubject.asObservable();
  }

  clearSearchString() {
    this.searchbarText = '';
    this.sbtSubject.next([this.searchbarText, this.filterStatuses]); 
    return this.sbtSubject.asObservable();
  }

  setSortField(sortField: string) {
    this.sortField = sortField;
    this.sortSubject.next([this.sortField, this.sortAscending]); 
  }
  
  setAscending(ascending: boolean) {
    this.sortAscending = ascending;
    this.sortSubject.next([this.sortField, this.sortAscending]); 
  }

  setFilterDone(filterStatuses: string[]) {
    this.filterStatuses = filterStatuses;
    this.sbtSubject.next([this.searchbarText, this.filterStatuses]);
  }

  getSortTuple() {
    return this.sortSubject.asObservable();
  }

}
