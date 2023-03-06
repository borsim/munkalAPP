import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { IconPickerModule } from 'ngx-icon-picker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

import { FilterPipe } from './shared/filter.pipe';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { MatNativeDateModule } from '@angular/material/core';

const firebaseConfig = {
  apiKey: 'AIzaSyD3p6xJROowWv9ZBfvVkIG1jVcyxmNIG5w',
  authDomain: 'oraszerviz-munkalap.firebaseapp.com',
  projectId: 'oraszerviz-munkalap',
  storageBucket: 'oraszerviz-munkalap.appspot.com',
  messagingSenderId: '2130836140',
  appId: '1:2130836140:web:1fb76877d4c195602efd09',
  measurementId: 'G-55ZRJL2CJN',
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    IconPickerModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: '', component: OrderListComponent },
      { path: 'orders/:orderId', component: OrderDetailsComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderFormComponent,
    FilterPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
