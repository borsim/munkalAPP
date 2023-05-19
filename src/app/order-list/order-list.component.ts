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
  sortTuple: [string, boolean] = ['', false];
  oss = orderStatusSelection;
  orderFormIsOpen = false;
  stringifiedData: string = '';
  //alreadyLoggedIn: boolean = false;

  orderFormComponent = new OrderFormComponent(this.databaseService);

  constructor(
    public searchbarService: SearchbarService,
    public databaseService: DatabaseService,
    public filterPipe: FilterPipe,
    public sortPipe: ArraySortPipe
  ) {
    this.databaseService.databaseOrders.subscribe((dbOrders) => {
       
      this.orders = [];
      dbOrders.forEach((dbOrder) => {
        this.orders.push(
          new Order(
            dbOrder.id,
            dbOrder.name,
            dbOrder.price,
            dbOrder.description,
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
            dbOrder.guarantee
          )
        );
      });
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
      this.sortTuple = newSortTuple;
      this.filteredOrders = this.filterPipe.transform(this.orders, this.filterString, this.filterDone);
      if (!this.filterString) this.filteredOrders = this.filteredOrders.slice();
      this.sortedOrdersSubject.next(this.filteredOrders);
    });
  }

  testF() {
    //alert(JSON.stringify(this.databaseService.orders));
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
}
