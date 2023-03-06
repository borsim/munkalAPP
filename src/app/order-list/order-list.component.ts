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

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  constructor(private searchbarService: SearchbarService) {}
  orders = orders;
  oss = orderStatusSelection;
  searchText = this.searchbarService.getSearchString();
  orderFormIsOpen = false;
  orderFormComponent = new OrderFormComponent();

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
