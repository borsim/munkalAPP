export class Order implements OrderInterface {
  constructor(
    public id: string = '0',
    public name: string = '',
    public price: number = 0,
    public description: string = '',
    public orderStatus: string = '',
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
    public guarantee: string = ''
  ) {}
}

export interface OrderInterface {
  id: string;
  name: string;
  price: number;
  description: string;
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
}

export var orders = [
  {
    id: '1',
    name: 'Omega123',
    price: 799,
    description: 'Törött üveg',
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
