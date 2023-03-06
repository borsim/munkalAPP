import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Order, OrderInterface } from '../orders';
import { Observable } from 'rxjs';
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
    this.databaseOrders.subscribe((dbOrders) => {
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
        //alert(dbOrder.guarantee)
        //alert(JSON.stringify(dbOrder));
      });
      //this.orders = dbOrders;
    });
  }

  addOrderToDb(newOrder: Order) {
    this.ordersCollection.add(newOrder);
  }

  getOrders() {
    return this.orders;
  }

  /*clearDatabaseOrders() {
    this.databaseOrders = [];
    return this.databaseOrders;
  }*/
}
