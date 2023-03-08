import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Order, OrderInterface } from '../orders';
import { OrderFormComponent } from '../order-form/order-form.component';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import moment from 'moment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: Order | undefined;
  orders: Order[] = [];
  orderObs: any;
  currentOrderId: string = '';
  orderDoc;
  openTab = 0;
  editing = false;

  orderFormComponent = new OrderFormComponent(this.databaseService);

  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private databaseService: DatabaseService
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = Number(routeParams.get('orderId')); // ?? routeParams.get('orderId') : ''
    const oid: string = routeParams.get('orderId')!;
    this.currentOrderId = oid;

    this.orderDoc = store.doc<OrderInterface>('Orders/' + oid);
    let orderVC = this.orderDoc.valueChanges(); //{idField: 'id'});
    this.orderObs = orderVC;

    orderVC.subscribe((dbOrder) => {
      const nonNullOrder: Order =
        dbOrder !== null
          ? new Order(
              oid,
              dbOrder!.name,
              dbOrder!.price,
              dbOrder!.description,
              dbOrder!.orderStatus,
              dbOrder!.icon,
              dbOrder!.customerName,
              dbOrder!.telephoneNumber,
              dbOrder!.email,
              dbOrder!.task,
              dbOrder!.deadline,
              dbOrder!.creationTime,
              dbOrder!.lastUpdatedTime,
              dbOrder!.returnedTime,
              dbOrder!.advancePayment,
              dbOrder!.notes,
              dbOrder!.doneTasks,
              dbOrder!.guarantee
            )
          : new Order('0');
      this.order = nonNullOrder;
    });
  }

  updateOrder(newOrder: Order) {
    newOrder.lastUpdatedTime = moment().valueOf();
    let newIOrder: OrderInterface = {
      id: this.currentOrderId,
      name: newOrder.name,
      price: newOrder.price,
      description: newOrder.description,
      orderStatus: newOrder.orderStatus,
      icon: newOrder.icon,
      customerName: newOrder.customerName,
      telephoneNumber: newOrder.telephoneNumber,
      email: newOrder.email,
      task: newOrder.task,
      deadline: newOrder.deadline,
      creationTime: newOrder.creationTime,
      lastUpdatedTime: newOrder.lastUpdatedTime,
      returnedTime: newOrder.returnedTime,
      advancePayment: newOrder.advancePayment,
      notes: newOrder.notes,
      doneTasks: newOrder.doneTasks,
      guarantee: newOrder.guarantee,
    };
    this.orderDoc.update(newIOrder);
  }

  toggleEditing() {
    if (!this.editing) {
      this.updateOrder(new Order());
    }
  }

  ngOnInit() {
    // First get the order id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const oid: string = routeParams.get('orderId') ?? '';
    this.currentOrderId = oid;
    //const orderIdFromRoute = Number(routeParams.get('orderId'));

    // Find the order that correspond with the id provided in route.
    //this.order = this.getDocument(routeParams.get('orderId')); //this.orders.find((order) => order.id === orderIdFromRoute);
  }
}
