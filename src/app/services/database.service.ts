import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage'
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

  constructor(private store: AngularFirestore, public afStorage: AngularFireStorage) {
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
      casingNumber: newOrder.casingNumber,
      description: newOrder.description,
      originalState: newOrder.originalState,
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
      guaranteeEndTime: newOrder.guaranteeEndTime,
      advancePayment: newOrder.advancePayment,
      notes: newOrder.notes,
      doneTasks: newOrder.doneTasks,
      guarantee: newOrder.guarantee,
      handoverState: newOrder.handoverState,
      photoIds: newOrder.photoIds,
    };
    this.ordersCollection.add(newIOrder);
  }

  updateOrderInDb(newOrder: Order) {
    let orderDoc = this.store.doc<OrderInterface>('Orders/' + newOrder.id);
    let orderVC = orderDoc.valueChanges();
    let newIOrder = newOrder.toInterface();
    orderDoc.update(newIOrder);
  }

  deleteOrderInDb(toDelete: Order) {
    if (window.confirm('Biztosan törölni szeretnéd ezt a munkalapot és a fotóit?\nAz itt kitörölt adatok NEM VISSZAÁLLÍTHATÓAK.')) {
      let orderDoc = this.store.doc<OrderInterface>('Orders/' + toDelete.id);
      for (let i: number=0; i < toDelete.photoIds.length; i++) {
        let currentId: string = toDelete.id.concat('/', toDelete.photoIds[i]);
        let photoRef = this.afStorage.ref(currentId);
        photoRef.delete();
      }
      orderDoc.delete();
    }
  }

  getOrders() {
    return this.orders;
  }

  /*clearDatabaseOrders() {
    this.databaseOrders = [];
    return this.databaseOrders;
  }*/
}
