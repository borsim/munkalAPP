import { Component, Input } from '@angular/core';
import { IconPickerModule } from 'ngx-icon-picker';
import {
  orders,
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
  orders = orders;
  oss = orderStatusSelection;
  orderFormIsOpen = false;
  stringifiedData: string = '';

  orderFormComponent = new OrderFormComponent();

  constructor(
    public searchbarService: SearchbarService,
    public databaseService: DatabaseService
  ) {
    this.orders = this.databaseService.orders;
    /*this.databaseService.databaseOrders.subscribe((dbOrders) => {
      dbOrders.forEach((dbOrder) => {
        console.log(dbOrder);
        this.orders.push(new Order(1));
      });
      //this.orders = dbOrders;
      //this.testF();
    });*/
  }

  testF() {
    alert(JSON.stringify(this.databaseService.orders));
    console.log(this.databaseService.orders);
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
