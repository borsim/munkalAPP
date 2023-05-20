import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Order, orderStatusSelection } from '../orders';
import { DatabaseService } from '../services/database.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthService } from './../services/auth.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage'
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  orderStatusValues = orderStatusSelection;
  openTab: number = 0;
  uploadProgress: Observable<number> = of(0);
  photoRefs: string[] = [];
  @Input() readonly: boolean = false;
  @Input() confirmButtonsHidden: boolean = false;
  @Input() order: Order = new Order('0');
  @Input() submitBehaviour = 'new';


  constructor(private dbs: DatabaseService, public afStorage: AngularFireStorage, public authservice: AuthService) {
  }

  model = this.order;

  submitted = false;

  uploadPhoto(event: any) {
    let uploadPath = '/'.concat(this.order.id,'/', this.order.numPhotos.toString());
    let ref = this.afStorage.ref(uploadPath);
    let task = ref.put(event.target.files[0]);
    let newOrder: Order = this.order;
    newOrder.numPhotos += 1;
    this.dbs.updateOrderInDb(newOrder);
    this.order.numPhotos = newOrder.numPhotos;
    this.uploadProgress = task.snapshotChanges()
    .pipe(map(s => (s!.bytesTransferred / s!.totalBytes) * 100));
  }

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
      this.photoRefs = [];
      for (let i: number=0; i < this.order.numPhotos; i++) {
        let currentRef: string = this.order.id.concat('/', i.toString());
        this.photoRefs.push(currentRef);
      }
      for (let i: number=0; i < this.order.numPhotos; i++) {
        this.afStorage.ref(this.photoRefs[i]).getDownloadURL().subscribe((url) => {
          let currentImg = document.getElementById('img'.concat(i.toString()));
          if (currentImg) currentImg.setAttribute('src', url);
        });
      }
    }
  }
}
