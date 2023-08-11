import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getFunctions } from 'firebase/functions';
const firebaseConfig = {
    apiKey: 'AIzaSyD3p6xJROowWv9ZBfvVkIG1jVcyxmNIG5w',
    authDomain: 'oraszerviz-munkalap.firebaseapp.com',
    projectId: 'oraszerviz-munkalap',
    storageBucket: 'oraszerviz-munkalap.appspot.com',
    messagingSenderId: '2130836140',
    appId: '1:2130836140:web:1fb76877d4c195602efd09',
    measurementId: 'G-55ZRJL2CJN',
  };
const app = firebase.initializeApp(firebaseConfig);
const functions = getFunctions(app);

import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ui: any;
  isLoggedIn: any = false;

  ngOnInit(){
    this.isLoggedIn = this.authservice.currentUser != null;
    this.authservice.currentAuthStatus.subscribe(authStatus =>  {
      this.isLoggedIn = (authStatus!=null);
      //window.location.reload();
    })
  }

  constructor( public authservice: AuthService) {
    this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult: boolean, redirectUrl: string) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered, hide the loader
            document.getElementById('loader')!.style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      };
      this.ui.start('#firebaseui-auth-container', uiConfig);

  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
