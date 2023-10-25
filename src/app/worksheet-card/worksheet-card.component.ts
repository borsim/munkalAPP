import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderInterface } from '../orders';
import { PrintService } from '../services/print.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatabaseService } from '../services/database.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Moment } from 'moment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirebaseError } from '@angular/fire/app';
import moment from 'moment';

@Component({
  selector: 'app-worksheet-card',
  templateUrl: './worksheet-card.component.html',
  styleUrls: ['./worksheet-card.component.css']
})
export class WorksheetCardComponent implements OnInit {

  orderId: string = '';
  orderObs: any;
  orderDoc: any;
  order: Order | undefined;
  timeSnapshot: Moment = moment();
  datetimeText = '';
  dateText = '';
  qrcodeString: string = '';
  wsFooterText: string = 'Lábléc';
  wsReceiptText: string = 'Átvétel szabályai';

  constructor(private route: ActivatedRoute, private printService: PrintService,
    private store: AngularFirestore, private databaseService: DatabaseService, private afStorage: AngularFireStorage) {

    const routeParams = this.route.snapshot.paramMap;
    const oid: string = routeParams.get('orderId')!;
    this.orderId = oid;

    this.orderDoc = store.doc<OrderInterface>('Orders/' + this.orderId);
    let orderVC: Observable<OrderInterface> = this.orderDoc.valueChanges();
    this.orderObs = orderVC;


    orderVC.subscribe((dbOrder) => {
      const nonNullOrder: Order =
        (dbOrder !== null && dbOrder !== undefined)
          ? new Order(
              oid,
              dbOrder.serialNumber,
              dbOrder.createdByUser,
              dbOrder.name,
              dbOrder.price,
              dbOrder.casingNumber,
              dbOrder.description,
              dbOrder.originalState,
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
              dbOrder.guaranteeStartTime,
              dbOrder.guaranteeEndTime,
              dbOrder.advancePayment,
              dbOrder.notes,
              dbOrder.doneTasks,
              dbOrder.guarantee,
              dbOrder.handoverState,
              dbOrder.photoIds,
            )
          : new Order('0');
        this.order = nonNullOrder;

        this.timeSnapshot = moment();
        this.datetimeText = this.timeSnapshot.format('YYYY/MM/DD HH:mm');
        this.dateText = this.timeSnapshot.format('YYYY/MM/DD');
        this.qrcodeString = 'https://oraszerviz-munkalap.firebaseapp.com/orders/'.concat(this.orderId); 
        this.wsFooterText = this.databaseService.currentUserConfig.value.worksheetCardFooterText;
        this.wsReceiptText = this.databaseService.currentUserConfig.value.worksheetCardReceiptText;
        this.afStorage.ref('/config/logo').getDownloadURL().subscribe((url) => {
          let currentImg = document.getElementById('logo-img');
          if (currentImg != null) {
            currentImg.onload = function() {
              printService.onDataReady();
            }
            currentImg.setAttribute('src', url);
          }
        });
        
    })
  }

  ngOnInit(): void {

  }

}
