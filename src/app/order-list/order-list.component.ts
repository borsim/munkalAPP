import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IconPickerModule } from 'ngx-icon-picker';
import {
  Order,
  orderStatusSelection,
} from '../orders';
import { OrderFormComponent } from '../order-form/order-form.component';
import { SearchbarService } from '../services/searchbar.service';
import { DatabaseService } from '../services/database.service';
import { FilterPipe } from './../shared/filter.pipe';
import { ArraySortPipe } from './../shared/sort.pipe';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Userconfig } from '../userconfigs';

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
  userConfigSubject: BehaviorSubject<Userconfig> = new BehaviorSubject<Userconfig>(new Userconfig());
  filterString: string = '';
  filterStatuses: string[] = ['registered', 'waiting for part', 'tasks done', 'ready for pickup'];
  filterCreatedByUser: string = '';
  sortTuple: [string, boolean] = ['creationTime', false];
  oss = orderStatusSelection;
  orderFormIsOpen = false;
  stringifiedData: string = '';
  //alreadyLoggedIn: boolean = false;

  orderFormComponent = new OrderFormComponent(this.databaseService, this.afStorage, this.authService);

  constructor(
    public searchbarService: SearchbarService,
    public databaseService: DatabaseService,
    public filterPipe: FilterPipe,
    public sortPipe: ArraySortPipe,
    public afStorage: AngularFireStorage,
    public authService: AuthService,
  ) {
    this.userConfigSubject = this.databaseService.currentUserConfig;
    this.userConfigSubject.subscribe((newUC) => {
      if (newUC.showOtherOrders) {
        this.filterCreatedByUser = '';
      } else {
        this.filterCreatedByUser = authService.currentUser;
      }
    })
    this.databaseService.databaseOrders.subscribe((dbOrders) => {
       
      this.orders = [];
      dbOrders.forEach((dbOrder) => {
        this.orders.push(
          new Order(
            dbOrder.id,
            dbOrder.serialNumber,
            dbOrder.createdByUser,
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
            dbOrder.guaranteeEndTime,
            dbOrder.advancePayment,
            dbOrder.notes,
            dbOrder.doneTasks,
            dbOrder.guarantee,
            dbOrder.handoverState,
            dbOrder.photoIds
          )
        );
      });
      this.filteredOrders = this.filterPipe.transform(this.orders, this.filterString, this.filterStatuses, this.filterCreatedByUser);
      this.sortedOrdersSubject.next(this.filteredOrders);
    });
    this.filteredOrders = this.orders;
    this.sortedOrdersSubject.next(this.filteredOrders);
    this.searchbarService.sbtSubject.subscribe((newSbTuple) => {
      this.filterString = newSbTuple[0];
      this.filterStatuses = newSbTuple[1];
      this.filteredOrders = this.filterPipe.transform(this.orders, this.filterString, this.filterStatuses, this.filterCreatedByUser);
      this.sortedOrdersSubject.next(this.filteredOrders);
    });
    this.searchbarService.sortSubject.subscribe((newSortTuple) => {
      var oldSortTuple: [string, boolean] = this.sortTuple;
      this.sortTuple = newSortTuple;
      this.filteredOrders = this.filterPipe.transform(this.orders, this.filterString, this.filterStatuses, this.filterCreatedByUser);
      if (!this.filterString) this.filteredOrders = this.filteredOrders.slice();
      if (oldSortTuple[1] !== newSortTuple[1] || oldSortTuple[0] !== newSortTuple[0]) this.filteredOrders = this.filteredOrders.slice();
      this.sortedOrdersSubject.next(this.filteredOrders);
    });
  }

  onIconSelect(icon: string, order: Order) {
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
  }
}
