import { Component, Input } from '@angular/core';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  orders: Order[] = [];
  oss = orderStatusSelection;
  orderFormIsOpen = false;
  stringifiedData: string = '';

  orderFormComponent = new OrderFormComponent(this.databaseService);

  constructor(
    public searchbarService: SearchbarService,
    public databaseService: DatabaseService
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
