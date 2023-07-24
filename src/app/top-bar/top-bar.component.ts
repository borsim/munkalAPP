import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchbarService } from '../services/searchbar.service';
import { OrderSortingInterface, sortingStatusSelection, orderStatusSelection, Order } from '../orders';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText: string = '';
  toggleSearch: boolean = false;
  selectedSorting: any = '';
  sortAscending: boolean = false;
  filterStatuses: string[] = ['registered', 'waiting for part', 'tasks done', 'ready for pickup'];
  statusSelection: OrderSortingInterface[] = sortingStatusSelection;
  orderStatusValues = orderStatusSelection;

  constructor(private searchbarService: SearchbarService) {}
  ngOnInit() {
    this.selectedSorting = 'creationTime';
  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
    this.searchbarService.clearSearchString();
  }
  updateSBServiceData() {
    console.log(this.searchText);
    this.searchbarService.setSearchString(this.searchText);
  }
  changeFilterValue(filterValue: any) {
    this.searchbarService.setFilterDone(filterValue.value);
  }
  changeRadioValue(radioValue: any) {
    this.searchbarService.setSortField(radioValue.value);
  }
  changeSortValue(sortValue: any) {
    this.searchbarService.setAscending(sortValue);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
