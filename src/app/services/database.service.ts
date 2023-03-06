import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../orders';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private store: AngularFirestore) {
    this.databaseOrders = this.asyncDownloadOrders();
  }

  databaseOrders: Order[] = [];
  setDatabaseOrders(newOrders: Order[]) {
    this.databaseOrders = newOrders;
    this.uploadOrdersToDb();
  }

  getDatabaseOrders(refreshFromDb: boolean) {
    if (refreshFromDb) {
      this.databaseOrders = this.asyncDownloadOrders();
    }
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

  async asyncDownloadOrders() {
    let downloadedOrders: Order[] = [];
    downloadedOrders = await this.downloadOrdersFromDb();
    return downloadedOrders;
  }

  uploadOrdersToDb() {}

  /*clearDatabaseOrders() {
    this.databaseOrders = [];
    return this.databaseOrders;
  }*/
}
