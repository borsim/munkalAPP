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
  }

  async dbToArray() {}

  addOrderToDb(newOrder: Order) {
    let dbid = this.store.createId();
    alert(dbid);
    newOrder.id = dbid;
    alert(newOrder);
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
