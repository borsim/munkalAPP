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
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

import { FilterPipe } from './shared/filter.pipe';
import { environment } from '../../src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import {
  MatMomentDateModule,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
} from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ArraySortPipe } from './shared/sort.pipe';
import { WarrantyCardComponent } from './warranty-card/warranty-card.component';
import { WorksheetCardComponent } from './worksheet-card/worksheet-card.component';
import { QRCodeModule } from 'angularx-qrcode';

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
    MatOptionModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatSlideToggleModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    MatRadioModule,
    ScrollingModule,
    QRCodeModule,
    RouterModule.forRoot([
      { path: '', component: OrderListComponent },
      { path: 'orders/:orderId', component: OrderDetailsComponent },
      { path: 'print',
        outlet: 'print',
        children: [
          { path: 'warranty-card/:orderId', component: WarrantyCardComponent },
          { path: 'worksheet-card/:orderId', component: WorksheetCardComponent },
        ]
      }
    ]),
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: { 
      parse: {
        dateInput: 'YYYY/MM/DD'
      },
      display: {
          dateInput: 'YYYY/MM/DD',
          monthYearLabel: 'YYYY MMMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY MMMM'
      }}},
    FilterPipe,
    ArraySortPipe
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderFormComponent,
    FilterPipe,
    ArraySortPipe,
    WarrantyCardComponent,
    WorksheetCardComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
