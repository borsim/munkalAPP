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

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  orders = orders;
  oss = orderStatusSelection;
  orderFormIsOpen = false;

  orderFormComponent = new OrderFormComponent();

  constructor(
    public searchbarService: SearchbarService,
    private databaseService: DatabaseService
  ) {
    getOrdersFromDatabase();
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
  async getOrdersFromDatabase() {
    this.orders = await this.databaseService.downloadOrdersFromDb();
  }
}
