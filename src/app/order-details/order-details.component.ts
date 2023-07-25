import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Order, OrderInterface } from '../orders';
import { OrderFormComponent } from '../order-form/order-form.component';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import moment from 'moment';
import { PrintService } from '../services/print.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: Order | undefined;
  orderObs: any;
  currentOrderId: string = '';
  orderDoc;
  openTab = 0;
  disableEditing: boolean = true;
  submitBehaviour: string = 'update';

  @ViewChild(OrderFormComponent) orderFormComponent!: OrderFormComponent;

  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private databaseService: DatabaseService,
    public printService: PrintService,
    private router: Router,
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const oid: string = routeParams.get('orderId')!;
    this.currentOrderId = oid;

    this.orderDoc = store.doc<OrderInterface>('Orders/' + oid);
    let orderVC = this.orderDoc.valueChanges(); //{idField: 'id'});
    this.orderObs = orderVC;


    orderVC.subscribe((dbOrder) => {
      const nonNullOrder: Order =
        dbOrder !== null
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
    });
  }

  toggleEditing() {
    if (this.disableEditing) {
      this.orderFormComponent.onSubmit();
      this.orderFormComponent.submitted = false;
    }
  }

  ngOnInit() {
    // First get the order id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const oid: string = routeParams.get('orderId') ?? '';
    this.currentOrderId = oid;
    //const orderIdFromRoute = Number(routeParams.get('orderId'));

    // Find the order that correspond with the id provided in route.
    //this.order = this.getDocument(routeParams.get('orderId')); //this.orders.find((order) => order.id === orderIdFromRoute);
  }

  onPrintWarranty() {
    this.printService.printDocument('warranty-card', this.currentOrderId);
  }

  onPrintWorksheet() {
    this.printService.printDocument('worksheet-card', this.currentOrderId);
  }

  deleteOrder() {
    if (this.order) {
      this.databaseService.deleteOrderInDb(this.order);
      this.router.navigateByUrl('/')
    }
  }
}
