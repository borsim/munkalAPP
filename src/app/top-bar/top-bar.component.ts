import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchbarService } from '../services/searchbar.service';
import { OrderSortingInterface, sortingStatusSelection } from '../orders';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText: string = '';
  toggleSearch: boolean = false;
  selectedSorting: string = "abc";
  sortAscending: boolean = false;
  filterDone: boolean = true;
  statusSelection: OrderSortingInterface[] = sortingStatusSelection;

  constructor(private searchbarService: SearchbarService) {}

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
    this.searchbarService.setSearchString(this.searchText);
  }
  changeToggleValue(toggleValue: any) {
    this.searchbarService.setFilterDone(toggleValue.checked);
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
