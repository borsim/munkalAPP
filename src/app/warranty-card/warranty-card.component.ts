import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderInterface } from '../orders';
import { PrintService } from '../services/print.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatabaseService } from '../services/database.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Moment } from 'moment';
import moment from 'moment';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-warranty-card',
  templateUrl: './warranty-card.component.html',
  styleUrls: ['./warranty-card.component.css']
})
export class WarrantyCardComponent implements OnInit {

  orderId: string = '';
  orderObs: any;
  orderDoc: any;
  order: Order | undefined;
  timeSnapshot: Moment = moment();
  datetimeText = '';
  dateText = '';
  wcFooterText: string = '';


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
              dbOrder!.createdByUser,
              dbOrder!.name,
              dbOrder!.price,
              dbOrder!.casingNumber,
              dbOrder!.description,
              dbOrder!.originalState,
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
              dbOrder!.guaranteeEndTime,
              dbOrder!.advancePayment,
              dbOrder!.notes,
              dbOrder!.doneTasks,
              dbOrder!.guarantee,
              dbOrder!.handoverState,
              dbOrder!.photoIds,
            )
          : new Order('0');
        this.order = nonNullOrder;

        this.timeSnapshot = moment();
        this.datetimeText = this.timeSnapshot.format('YYYY-MM-DD HH:mm');
        this.dateText = this.timeSnapshot.format('YYYY-MM-DD');
        this.wcFooterText = this.databaseService.currentUserConfig.value.warrantyCardFooterText;

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
