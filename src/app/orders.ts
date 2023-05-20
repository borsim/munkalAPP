import { ThisReceiver } from "@angular/compiler";
import { throwToolbarMixedModesError } from "@angular/material/toolbar";

export class Order implements OrderInterface {
  constructor(
    public id: string = '0',
    public name: string = '',
    public price: number = 0,
    public casingNumber: string = '',
    public description: string = '',
    public originalState: string = '',
    public orderStatus: string = 'registered',
    public icon: string = '',
    public customerName: string = '',
    public telephoneNumber: string = '',
    public email: string = '',
    public task: string = '',
    public deadline: number = 0,
    public creationTime: number = 0,
    public lastUpdatedTime: number = 0,
    public returnedTime: number = 0,
    public advancePayment: number = 0,
    public notes: string = '',
    public doneTasks: string = '',
    public guarantee: string = '',
    public handoverState: string = '',
  ) {}
  toInterface() {
    let oi: OrderInterface = {id: this.id, name: this.name, price: this.price, casingNumber: this.casingNumber, 
      description: this.description, originalState: this.originalState, orderStatus: this.orderStatus,
      icon: this.icon, customerName: this.customerName, telephoneNumber: this.telephoneNumber, email: this.email,
      task: this.task, deadline: this.deadline, creationTime: this.creationTime, lastUpdatedTime: this.lastUpdatedTime, 
      returnedTime: this.returnedTime, advancePayment: this.advancePayment, notes: this.notes, doneTasks: this.doneTasks,
      guarantee: this.guarantee, handoverState: this.handoverState}
    return oi;
  }
}

export interface OrderInterface {
  id: string;
  name: string;
  price: number;
  casingNumber: string;
  description: string;
  originalState: string;
  orderStatus: string;
  icon: string;
  customerName: string;
  telephoneNumber: string;
  email: string;
  task: string;
  deadline: number;
  creationTime: number;
  lastUpdatedTime: number;
  returnedTime: number;
  advancePayment: number;
  notes: string;
  doneTasks: string;
  guarantee: string;
  handoverState: string;
}

export var orders = [
  {
    id: '1',
    name: 'Omega123',
    price: 799,
    casingNumber: 'A1B2C3',
    description: 'Törött üveg',
    originalState: 'Karcolt hátlap',
    orderStatus: 'ready for pickup',
    icon: 'home',
    customerName: 'Jóska Pista',
    telephoneNumber: '0630 123 4567',
    email: 'abc@gmail.com',
    task: 'üvegcsere',
    deadline: 12345678,
    creationTime: 23456789,
    lastUpdatedTime: 345678901,
    returnedTime: 456789012,
    advancePayment: 200,
    notes: 'rozsdás a hátlap',
    doneTasks: '',
    guarantee: '3 hónap',
    handoverState: 'polírozott hátlap',
  },
];

export const possibleStatuses = ['asd'];

export interface OrderStatusInterface {
  value: string;
  viewValue: string;
}

export const orderStatusSelection: OrderStatusInterface[] = [
  { value: 'registered', viewValue: 'Felvéve' },
  { value: 'ready for pickup', viewValue: 'Átadásra vár' },
  { value: 'waiting for part', viewValue: 'Darabra vár' },
  { value: 'done', viewValue: 'Kész, átadva'}
];

export interface OrderSortingInterface {
  value: string;
  viewValue: string;
}

export const sortingStatusSelection: OrderSortingInterface[] = [
  { value: 'name', viewValue: 'ABC' },
  { value: 'creationTime', viewValue: 'Felvétel ideje' },
  { value: 'lastUpdatedTime', viewValue: 'Legutóbb módosítva' },
  { value: 'deadline', viewValue: 'Határidő' },
];

export const statusToIcon = {
  home: 'done',
  search: 'incomplete',
};

export const statusToDisplayName = {
  registered: 'Felvéve',
  ready_for_pickup: 'Átadásra vár',
  waiting_for_part: 'Darabra vár',
};

export const iconToStatus = {
  done: 'home',
  incomplete: 'search',
};

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
