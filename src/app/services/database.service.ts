import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Order, OrderInterface } from '../orders';
import { Observable } from 'rxjs';
import moment from 'moment';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private ordersCollection: AngularFirestoreCollection<OrderInterface>;
  public databaseOrders: Observable<OrderInterface[]>;
  public orders: Order[] = [];

  constructor(private store: AngularFirestore) {
    this.ordersCollection = store.collection<Order>('Orders');
    this.databaseOrders = this.ordersCollection.valueChanges({ idField: 'id' });
  }

  async dbToArray() {}

  addOrderToDb(newOrder: Order) {
    let dbid = this.store.createId();
    newOrder.id = dbid;
    newOrder.creationTime = moment().valueOf();
    newOrder.lastUpdatedTime = newOrder.creationTime;
    let newIOrder: OrderInterface = {
      id: dbid,
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
    this.ordersCollection.add(newIOrder);
  }

  getOrders() {
    return this.orders;
  }

  /*clearDatabaseOrders() {
    this.databaseOrders = [];
    return this.databaseOrders;
  }*/
}
