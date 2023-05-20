import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Order, orderStatusSelection } from '../orders';
import { DatabaseService } from '../services/database.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage'
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  orderStatusValues = orderStatusSelection;
  openTab: number = 0;
  uploadProgress: Observable<number> = of(0);
  @Input() readonly: boolean = false;
  @Input() confirmButtonsHidden: boolean = false;
  @Input() order: Order = new Order('0');
  @Input() submitBehaviour = 'new';


  constructor(private dbs: DatabaseService, /*private afStorage: AngularFireStorage*/) {
  }

  model = this.order;
  /*new Order(
    '123456789',
    'Megrendelés neve',
    0,
    'Leírás',
    this.orderStatusValues[0].value,
    'home',
    'Vásárló',
    '0630 111 1111',
    '123@456.com',
    'javítás',
    123,
    456,
    789,
    1234,
    200,
    'megjegyzések',
    '',
    'Nem garanciás'
  );*/

  submitted = false;

  /*uploadPhoto(event: any) {
    let uploadPath = '/'.concat(this.order.id,'/', this.order.numPhotos.toString());
    let ref = this.afStorage.ref(uploadPath);
    let task = ref.put(event.target.files[0]);
    this.uploadProgress = task.snapshotChanges()
    .pipe(map(s => (s!.bytesTransferred / s!.totalBytes) * 100));
  }*/

  onSubmit() {
    this.submitted = true;
    if (this.submitBehaviour === 'new') {
      this.dbs.addOrderToDb(this.model);
    } else if (this.submitBehaviour === 'update') {
      this.dbs.updateOrderInDb(this.model);
    }
  }

  deadlineChanged(dl: any) {
    if (dl) this.model.deadline = dl.valueOf();
  }

  newOrder() {
    this.model = new Order();
    this.model.orderStatus = this.orderStatusValues[0].value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['readonly']) {
      this.readonly = changes['readonly'].currentValue;
    }
    if (changes['order']) {
      this.order = changes['order'].currentValue;
      this.model = this.order;
    }
  }
}
