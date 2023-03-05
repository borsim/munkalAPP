import { Component } from '@angular/core';
import { Order, orders, orderStatusSelection } from '../orders';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  orderStatusValues = orderStatusSelection;

  model = new Order(
    123456789,
    'Megrendelés neve',
    0,
    'Leírás',
    this.orderStatusValues[0].value,
    'home',
    'Vásárló',
    '0630 111 1111',
    '123@456.com',
    'javítás',
    123,
    456,
    789,
    1234,
    200,
    'megjegyzések',
    '',
    'Nem garanciás'
  );

  submitted = false;

  onSubmit() {
    this.submitted = true;
    orders.push(this.model);
  }

  newOrder() {
    this.model = new Order(
      1,
      'Új',
      0,
      'Leírás',
      this.orderStatusValues[0].value,
      'home',
      'Vásárló',
      '0630 111 1111',
      '123@456.com',
      'javítás',
      123,
      456,
      789,
      1234,
      200,
      'megjegyzések',
      '',
      'Nem garanciás'
    );
  }
}
