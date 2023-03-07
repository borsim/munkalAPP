import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Order } from '../orders';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  order: Order | undefined;
  orders: Order[] = [];
  openTab = 0;
  constructor(
    private route: ActivatedRoute,
    private store: Firestore,
    private databaseService: DatabaseService
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = Number(routeParams.get('orderId'));

    /*this.databaseService.databaseOrders.subscribe((dbOrders) => {
      dbOrders.forEach((dbOrder) => {
        this.orders = [];
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
      });
    });*/
  }

  async getDocument(docId: string) {
    const docRef = doc(this.store, 'Orders', docId);
    const docSnap = await getDoc(docRef);
    // TODO construct Order from data

    return docSnap.data();
  }

  ngOnInit() {
    // First get the order id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    //const orderIdFromRoute = Number(routeParams.get('orderId'));

    // Find the order that correspond with the id provided in route.
    this.order = this.getDocument(routeParams.get('orderId')); //this.orders.find((order) => order.id === orderIdFromRoute);
  }
}
