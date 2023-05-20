import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IconPickerModule } from 'ngx-icon-picker';
import {
  Order,
  statusToIcon,
  iconToStatus,
  orderStatusSelection,
} from '../orders';
import { OrderFormComponent } from '../order-form/order-form.component';
import { SearchbarService } from '../services/searchbar.service';
import { DatabaseService } from '../services/database.service';
import { FilterPipe } from './../shared/filter.pipe';
import { ArraySortPipe } from './../shared/sort.pipe';
import { Observable, of, BehaviorSubject } from 'rxjs';
/*const firebaseConfig = {
  apiKey: 'AIzaSyD3p6xJROowWv9ZBfvVkIG1jVcyxmNIG5w',
  authDomain: 'oraszerviz-munkalap.firebaseapp.com',
  projectId: 'oraszerviz-munkalap',
  storageBucket: 'oraszerviz-munkalap.appspot.com',
  messagingSenderId: '2130836140',
  appId: '1:2130836140:web:1fb76877d4c195602efd09',
  measurementId: 'G-55ZRJL2CJN',
};
import { AngularFireModule } from '@angular/fire/compat';
AngularFireModule.initializeApp(firebaseConfig)*/
import { AngularFireStorage } from '@angular/fire/compat/storage'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  sortedOrdersSubject: BehaviorSubject<Order[]> = new BehaviorSubject([] as Order[]);
  filterString: string = '';
  filterDone: boolean = true;
  sortTuple: [string, boolean] = ['creationTime', false];
  oss = orderStatusSelection;
  orderFormIsOpen = false;
  stringifiedData: string = '';
  //alreadyLoggedIn: boolean = false;

  orderFormComponent = new OrderFormComponent(this.databaseService, this.afStorage);

  constructor(
    public searchbarService: SearchbarService,
    public databaseService: DatabaseService,
    public filterPipe: FilterPipe,
    public sortPipe: ArraySortPipe,
    public afStorage: AngularFireStorage
  ) {
    this.databaseService.databaseOrders.subscribe((dbOrders) => {
       
      this.orders = [];
      dbOrders.forEach((dbOrder) => {
        this.orders.push(
          new Order(
            dbOrder.id,
            dbOrder.name,
            dbOrder.price,
            dbOrder.casingNumber,
            dbOrder.description,
            dbOrder.originalState,
            dbOrder.orderStatus,
            dbOrder.icon,
            dbOrder.customerName,
            dbOrder.telephoneNumber,
            dbOrder.email,
            dbOrder.task,
            dbOrder.deadline,
            dbOrder.creationTime,
            dbOrder.lastUpdatedTime,
            dbOrder.returnedTime,
            dbOrder.advancePayment,
            dbOrder.notes,
            dbOrder.doneTasks,
            dbOrder.guarantee,
            dbOrder.handoverState,
            dbOrder.numPhotos
          )
        );
      });
      this.filteredOrders = this.filterPipe.transform(this.orders, this.filterString, this.filterDone);
      this.sortedOrdersSubject.next(this.filteredOrders);
    });
    this.filteredOrders = this.orders;
    this.sortedOrdersSubject.next(this.filteredOrders);
    this.searchbarService.sbtSubject.subscribe((newSbTuple) => {
      this.filterString = newSbTuple[0];
      this.filterDone = newSbTuple[1];
      this.filteredOrders = this.filterPipe.transform(this.orders, this.filterString, this.filterDone);
      this.sortedOrdersSubject.next(this.filteredOrders);
    });
    this.searchbarService.sortSubject.subscribe((newSortTuple) => {
      var oldSortTuple: [string, boolean] = this.sortTuple;
      this.sortTuple = newSortTuple;
      this.filteredOrders = this.filterPipe.transform(this.orders, this.filterString, this.filterDone);
      if (!this.filterString) this.filteredOrders = this.filteredOrders.slice();
      if (oldSortTuple[1] !== newSortTuple[1] || oldSortTuple[0] !== newSortTuple[0]) this.filteredOrders = this.filteredOrders.slice();
      this.sortedOrdersSubject.next(this.filteredOrders);
    });
  }

  onIconSelect(icon: string, order: Order) {
    console.log(icon);
    order.icon = icon;
    //order.orderStatus = iconToStatus[icon as keyof iconToStatus];
  }
  iconToStatus(icon: string) {
    switch (icon) {
      case '':
        break;
      default:
        'complete';
    }
  }
  updateOrderStatus(incomingOrder: any) {
    this.databaseService.updateOrderInDb(incomingOrder);
    console.log(this.sortTuple);
  }
}
