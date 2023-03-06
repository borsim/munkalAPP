import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Order } from '../orders';

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
    private databaseService: DatabaseService
  ) {
    import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}


    this.databaseService.databaseOrders.subscribe((dbOrders) => {
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
    });
  }

  ngOnInit() {
    // First get the order id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = Number(routeParams.get('orderId'));

    // Find the order that correspond with the id provided in route.
    this.order = this.orders.find((order) => order.id === orderIdFromRoute);
  }
}
