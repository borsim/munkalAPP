import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public fireAuth: AngularFireAuth){
    this.authStatusListener();
  }


  currentUser: any = null;
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();


authStatusListener(){
  this.fireAuth.onAuthStateChanged((credential)=>{
    if(credential){
      console.log(credential);
      this.authStatusSub.next(credential);
      console.log('User is logged in');
    }
    else{
      this.authStatusSub.next(null);
      console.log('User is logged out');
    }
  })
}
}