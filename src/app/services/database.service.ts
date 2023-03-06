import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../orders';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private store: AngularFirestore) {}

  databaseOrders: Order[] = [];
  setDatabaseOrders(newOrders: Order[]) {
    this.databaseOrders = newOrders;
  }

  getDatabaseOrders() {
    return this.databaseOrders;
  }

  downloadOrdersFromDb() {
    return new Promise<any>((resolve) => {
      this.store
        .collection('Orders')
        .valueChanges({ idField: 'id' })
        .subscribe((databaseOrders) => resolve(databaseOrders));
    });
  }

  uploadOrdersToDb() {
    return new Promise<any>((resolve) => {
      this.store
        .collection('Orders')
        .valueChanges({ idField: 'id' })
        .subscribe((databaseOrders) => resolve(databaseOrders));
    });
  }

  /*clearDatabaseOrders() {
    this.databaseOrders = [];
    return this.databaseOrders;
  }*/
}
