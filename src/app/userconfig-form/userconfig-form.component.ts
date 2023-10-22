import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage, AngularFireStorageReference, BUCKET} from '@angular/fire/compat/storage'
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { v4 as uuid } from 'uuid';
import { filter, switchMap } from 'rxjs';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Userconfig } from '../userconfigs';
import { Router } from '@angular/router';

@Component({
  selector: 'userconfig-form',
  templateUrl: './userconfig-form.component.html',
  styleUrls: ['./userconfig-form.component.css'],
})
export class UserconfigFormComponent {
  uploadProgress: Observable<number> = of(0);
  userconfig: Userconfig = new Userconfig();

  readonly: boolean = true;


  constructor(private dbs: DatabaseService, public afStorage: AngularFireStorage,
    public authservice: AuthService, private router: Router) {
    dbs.currentUserConfig.subscribe((newUC) => {
      this.model = dbs.currentUserConfig.value;
    })
    this.model = dbs.currentUserConfig.value;
  }

  model = this.userconfig;
  submitted = false;

  toggleEditing(submitType: string) {
    if (this.readonly) {
      /*if (submitType === 'global') {
        this.model.id = 'global';
        this.model.nextOrderSerialNumber = this.dbs.globalUserConfig.value.nextOrderSerialNumber;
      } else {
        this.model.id = this.authservice.currentUser;
      }*/
      this.model.id = 'global';
      this.model.nextOrderSerialNumber = this.dbs.globalUserConfig.value.nextOrderSerialNumber;
      this.onSubmit();
      this.submitted = false;
    }
  }

  uploadLogo(event: any) {
    //this.deleteOldLogo();
    let uploadPath = '/'.concat('config','/', 'logo');
    let ref = this.afStorage.ref(uploadPath);
    let task = ref.put(event.target.files[0]);
    this.uploadProgress = task.snapshotChanges()
    .pipe(map(s => (s!.bytesTransferred / s!.totalBytes) * 100));
    
    task.snapshotChanges().pipe(
      filter((snapshot: any) => snapshot.state === 'success'),
      switchMap(() => ref.getDownloadURL())
    )
    .subscribe({
      next: (url) => {
        // upload finished
      },
      error: (err) => {
        console.error(err.message);
        alert("Logó feltöltése sikertelen. Próbálja újra.");
      }
    })
  }

  onSubmit() {
    console.log("new userconfig submitted");
    this.submitted = true;
    this.dbs.updateUserconfigInDb(this.model);
    this.model.id = this.authservice.currentUser;
    this.dbs.updateUserconfigInDb(this.model);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['readonly']) {
      this.readonly = changes['readonly'].currentValue;
    }
    if (changes['userconfig']) {
      this.userconfig = changes['userconfig'].currentValue;
      this.model = this.userconfig;
    }
  }

  deleteOldLogo() {
    let storagePhotoRef = this.afStorage.ref('/config/logo');
    try {
      storagePhotoRef.delete();
    } catch (error) {
      if (error !== 'storage/object-not-found') {
        console.log('Error deleting previous logo');
        console.log(error);
      }
    }
  }

  signOut() {
    this.router.navigateByUrl('/').then(()=>{
      this.authservice.fireAuth.signOut();
      window.location.reload();
    });
  }
}
