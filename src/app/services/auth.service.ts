import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public fireAuth: AngularFireAuth, private dtb: DatabaseService){
    this.authStatusListener();
  }


  currentUser: any = null;
  currentIdToken: string = '';
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();


  authStatusListener(){
    this.fireAuth.onAuthStateChanged((credential)=>{
      if(credential){
        this.authStatusSub.next(credential);
        this.currentUser = credential.uid;
        this.dtb.getSpecificUserConfig(this.currentUser);
        credential.getIdToken().then((token: string) => {
          this.currentIdToken = token;
        });
      }
      else{
        this.authStatusSub.next(null);
        console.log('User is logged out');
        this.currentUser = null;
      }
    })
  }
}