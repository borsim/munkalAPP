import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage'
import { Order, OrderInterface } from '../orders';
import { BehaviorSubject, Observable } from 'rxjs';
import moment from 'moment';
import { Userconfig, UserConfigInterface } from '../userconfigs';
import { AuthService } from './auth.service';
/* . . . */
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private ordersCollection: AngularFirestoreCollection<OrderInterface>;
  public databaseOrders: Observable<OrderInterface[]>;

  private userConfigCollection: AngularFirestoreCollection<UserConfigInterface>;
  public databaseUC: Observable<UserConfigInterface[]>;
  public currentUserConfig: BehaviorSubject<Userconfig> = new BehaviorSubject<Userconfig>(new Userconfig());
  public globalUserConfig: BehaviorSubject<Userconfig> = new BehaviorSubject<Userconfig>(new Userconfig());

  constructor(private store: AngularFirestore, public afStorage: AngularFireStorage) {
    this.ordersCollection = store.collection<Order>('Orders');
    this.databaseOrders = this.ordersCollection.valueChanges({ idField: 'id' });

    this.userConfigCollection = store.collection<Userconfig>('userconfig');
    this.databaseUC = this.userConfigCollection.valueChanges({ idField: 'id' });
    this.getGlobalUserConfig();
  }


  addOrderToDb(newOrder: Order, currentUser: string, nextOrderSerialNumber: number) {
    let dbid = this.store.createId();
    newOrder.id = dbid;
    newOrder.creationTime = moment().valueOf();
    newOrder.lastUpdatedTime = newOrder.creationTime;
    newOrder.createdByUser = (currentUser === null ? '' : currentUser);
    newOrder.serialNumber = nextOrderSerialNumber;
    let newIOrder: OrderInterface = {
      id: dbid,
      serialNumber: newOrder.serialNumber,
      createdByUser: newOrder.createdByUser,
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
      guaranteeStartTime: newOrder.guaranteeStartTime,
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

  getGlobalUserConfig() {
    let guc = this.store.doc<Userconfig>('userconfig/global');
    let gucVC = guc.valueChanges();
    gucVC.subscribe((dbconfig) => {
      const nonNullUC: Userconfig =
      dbconfig !== null ? new Userconfig(
        dbconfig!.id,
        dbconfig!.showOtherOrders,
        dbconfig!.warrantyCardFooterText,
        dbconfig!.worksheetCardFooterText,
        dbconfig!.worksheetCardReceiptText,
        dbconfig!.companyNameTop,
        dbconfig!.companyNameBottom,
        dbconfig!.nextOrderSerialNumber,
        dbconfig!.smsNotificationMessage,
        dbconfig!.emailNotificationMessage,
        dbconfig!.emailSubject,
      ) : new Userconfig();
      this.globalUserConfig.next(nonNullUC);
    })
  }
  getSpecificUserConfig(userId: string) {
    let uc = this.store.doc<Userconfig>('userconfig/' + userId);
    uc.get().subscribe((docSnapshot) => {
      if (docSnapshot.exists) {
        let ucVC = uc.valueChanges();
        ucVC.subscribe((dbconfig) => {
          // Use globalConfig values if userConfig has them undefined. Except for serial number that's always global
          const nonNullUC: Userconfig =
          dbconfig !== null ? new Userconfig(
            (dbconfig!.id == null ? this.globalUserConfig.value.id : dbconfig!.id),
            (dbconfig!.showOtherOrders == null ? this.globalUserConfig.value.showOtherOrders : dbconfig!.showOtherOrders),
            (dbconfig!.warrantyCardFooterText == null ? this.globalUserConfig.value.warrantyCardFooterText : dbconfig!.warrantyCardFooterText),
            (dbconfig!.worksheetCardFooterText == null ? this.globalUserConfig.value.worksheetCardFooterText : dbconfig!.worksheetCardFooterText),
            (dbconfig!.worksheetCardReceiptText == null ? this.globalUserConfig.value.worksheetCardReceiptText : dbconfig!.worksheetCardReceiptText),
            (dbconfig!.companyNameTop == null ? this.globalUserConfig.value.companyNameTop : dbconfig!.companyNameTop),
            (dbconfig!.companyNameBottom == null ? this.globalUserConfig.value.companyNameBottom : dbconfig!.companyNameBottom),
            this.globalUserConfig.value.nextOrderSerialNumber,
            (dbconfig!.smsNotificationMessage == null ? this.globalUserConfig.value.smsNotificationMessage : dbconfig!.smsNotificationMessage),
            (dbconfig!.emailNotificationMessage == null ? this.globalUserConfig.value.emailNotificationMessage : dbconfig!.emailNotificationMessage),
            (dbconfig!.emailSubject == null ? this.globalUserConfig.value.emailSubject : dbconfig!.emailSubject),
          ) : new Userconfig();
          this.currentUserConfig.next(nonNullUC);
        })
      } else {
        this.currentUserConfig.next(this.globalUserConfig.value);
      }
    })
  }

  updateUserconfigInDb(newUC: Userconfig) {
    let UCDoc = this.store.doc<UserConfigInterface>('userconfig/' + newUC.id);
    let newIUC = newUC.toInterface();
    UCDoc.get().subscribe((docSnapshot) => {
      if (docSnapshot.exists) {
        let UCVC = UCDoc.valueChanges();
        UCDoc.update(newIUC);
      } else {
        this.userConfigCollection.doc(newIUC.id).set(newIUC);
      }});
  }
}
