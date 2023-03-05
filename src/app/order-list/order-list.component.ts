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

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  orders = orders;
  oss = orderStatusSelection;
  @Input() searchText: string = '';
  orderFormIsOpen = false;
  orderFormComponent = new OrderFormComponent();

  share() {
    window.alert('The order has been completed!');
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
