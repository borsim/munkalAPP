import { Component } from '@angular/core';
import { Order, orderStatusSelection } from '../orders';
import { DatabaseService } from '../services/database.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  orderStatusValues = orderStatusSelection;
  openTab: number = 0;
  readonly: boolean = false;
  //picker: any;

  constructor(private dbs: DatabaseService) {}

  model = new Order(
    '123456789',
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
    this.dbs.addOrderToDb(this.model);
    //orders.push(this.model);
  }

  newOrder() {
    this.model = new Order(
      '1',
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
