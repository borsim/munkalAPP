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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

import { FilterPipe } from './shared/filter.pipe';
import { environment } from '../../src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS
} from '@angular/material-moment-adapter';

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
    MatFormFieldModule,
    MatMomentDateModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    MatDatepickerModule,
    ScrollingModule,
    RouterModule.forRoot([
      { path: '', component: OrderListComponent },
      { path: 'orders/:orderId', component: OrderDetailsComponent },
    ]),
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide:   MAT_MOMENT_DATE_FORMATS, useValue: {parse:{dateInput: 'DD.MM.YYYY'} } }
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
