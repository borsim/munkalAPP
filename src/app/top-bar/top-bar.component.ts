import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchbarService } from '../services/searchbar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText: string = '';
  toggleSearch: boolean = false;

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
    console.log(this.searchbarService.getSearchString());
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
