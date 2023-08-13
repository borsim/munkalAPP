import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Order, orderStatusSelection } from '../orders';
import { DatabaseService } from '../services/database.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthService } from './../services/auth.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage'
import { Observable, of, map, BehaviorSubject, Subject } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { v4 as uuid } from 'uuid';
import { filter, switchMap } from 'rxjs';
import { TextFieldModule } from '@angular/cdk/text-field';
import {WebcamImage} from 'ngx-webcam';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent {
  orderStatusValues = orderStatusSelection;
  public openTab: number = 0;
  uploadProgress: Observable<number> = of(0);
  photoRefs: string[] = [];

  webcamActive: boolean = false;
  webcamImage: any = null;
  webcamTrigger: Subject<void> = new Subject<void>();

  @Input() readonly: boolean = false;
  @Input() confirmButtonsHidden: boolean = false;
  @Input() order: Order = new Order('0');
  @Input() submitBehaviour = 'new';


  constructor(private dbs: DatabaseService, public afStorage: AngularFireStorage, public authservice: AuthService) {
  }

  model = this.order;

  submitted = false;

  uploadSelectedImage(event: any) {
    this.uploadPhoto(event.target.files[0]);
  }

  uploadPhoto(fileToUpload: File) {
    let randomUuid = uuid();
    let uploadPath = '/'.concat(this.order.id,'/', randomUuid);
    let ref = this.afStorage.ref(uploadPath);
    let task = ref.put(fileToUpload);
    let newOrder: Order = this.order;
    this.uploadProgress = task.snapshotChanges()
    .pipe(map(s => (s!.bytesTransferred / s!.totalBytes) * 100));
    
    task.snapshotChanges().pipe(
      filter((snapshot: any) => snapshot.state === 'success'),
      switchMap(() => ref.getDownloadURL())
    )
    .subscribe({
      next: (url) => {
        newOrder.photoIds.push(randomUuid);
        this.dbs.updateOrderInDb(newOrder);
        this.order.photoIds = newOrder.photoIds;
      },
      error: (err) => {console.error(err.message)}
    })
  }

  onSubmit() {
    console.log("form submitted");
    this.submitted = true;
    if (this.submitBehaviour === 'new') {
      this.dbs.addOrderToDb(this.model, this.authservice.currentUser, this.dbs.globalUserConfig.value.nextOrderSerialNumber);
      let newSerial = this.dbs.globalUserConfig.value;
      newSerial.nextOrderSerialNumber = newSerial.nextOrderSerialNumber + 1;
      this.dbs.updateUserconfigInDb(newSerial);
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
      for (let i: number=0; i < this.order.photoIds.length; i++) {
        let currentRef: string = this.order.id.concat('/', this.order.photoIds[i]);
        this.photoRefs.push(currentRef);
      }
      for (let i: number=0; i < this.order.photoIds.length; i++) {
        this.afStorage.ref(this.photoRefs[i]).getDownloadURL().subscribe((url) => {
          let currentImg = document.getElementById('img'.concat(i.toString()));
          if (currentImg) currentImg.setAttribute('src', url);
        });
      }
    }
  }

  deletePhoto(photoRef: string) {
    if (window.confirm('Biztosan törölni szeretnéd ezt a fotót?')) {
      let storagePhotoRef = this.afStorage.ref(photoRef);
      let pid = (photoRef.split("/", 2))[1];
      this.order.photoIds.splice(this.order.photoIds.indexOf(pid), 1);
      let orderWithoutPhoto: Order = this.order;
      storagePhotoRef.delete();
      this.dbs.updateOrderInDb(orderWithoutPhoto);
    }
  }

  triggerSnapshot(): void {
   this.webcamTrigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }
    
  public get triggerObservable(): Observable<void> {
    return this.webcamTrigger.asObservable();
  }
  toggleWebcamActive(saveImg: boolean) {
    if (this.webcamActive && saveImg) {

      const arr = this.webcamImage.imageAsDataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file: File = new File([u8arr], "camera_image.jpg", { type: "image/jpeg" })

      this.uploadPhoto(file);
      this.webcamImage = null;
    } else if (this.webcamActive && !saveImg) {
      this.webcamImage = null;
    }
  }
}
