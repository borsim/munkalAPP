import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderInterface } from '../orders';
import { PrintService } from '../services/print.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatabaseService } from '../services/database.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Moment } from 'moment';
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

  constructor(private route: ActivatedRoute, private printService: PrintService,
    private store: AngularFirestore, private databaseService: DatabaseService) {

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
              dbOrder!.advancePayment,
              dbOrder!.notes,
              dbOrder!.doneTasks,
              dbOrder!.guarantee,
              dbOrder!.handoverState
            )
          : new Order('0');
        this.order = nonNullOrder;

        this.timeSnapshot = moment();
        this.datetimeText = this.timeSnapshot.format('YYYY-MM-DD HH:mm');
        this.dateText = this.timeSnapshot.format('YYYY-MM-DD');
        this.qrcodeString = 'https://www.oraszerviz-munkalap.firebaseapp.com/orders/'.concat(this.orderId); 

        this.printService.onDataReady();
    })
  }

  ngOnInit(): void {

  }

}
