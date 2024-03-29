import { throwToolbarMixedModesError } from "@angular/material/toolbar";
import moment from "moment";

export class Order implements OrderInterface {
  constructor(
    public id: string = '0',
    public serialNumber: number = 0,
    public createdByUser: string = '',
    public name: string = '',
    public price: number = 0,
    public casingNumber: string = '',
    public description: string = '',
    public originalState: string = '',
    private _orderStatus: string = 'registered',
    public icon: string = '',
    public customerName: string = '',
    public telephoneNumber: string = '',
    public email: string = '',
    public task: string = '',
    public deadline: number = 0,
    public creationTime: number = 0,
    public lastUpdatedTime: number = 0,
    public returnedTime: number = 0,
    public guaranteeStartTime: number = 0,
    public guaranteeEndTime: number = 0,
    public advancePayment: number = 0,
    public notes: string = '',
    public doneTasks: string = '',
    public guarantee: number = 0,
    public handoverState: string = '',
    public photoIds: string[] = [],
  ) {}
  toInterface() {
    let oi: OrderInterface = {id: this.id, serialNumber: this.serialNumber, createdByUser: this.createdByUser, name: this.name, price: this.price, casingNumber: this.casingNumber, 
      description: this.description, originalState: this.originalState, orderStatus: this.orderStatus,
      icon: this.icon, customerName: this.customerName, telephoneNumber: this.telephoneNumber, email: this.email,
      task: this.task, deadline: this.deadline, creationTime: this.creationTime, lastUpdatedTime: this.lastUpdatedTime, 
      returnedTime: this.returnedTime, guaranteeStartTime: this.guaranteeStartTime, guaranteeEndTime: this.guaranteeEndTime, advancePayment: this.advancePayment, notes: this.notes, doneTasks: this.doneTasks,
      guarantee: this.guarantee, handoverState: this.handoverState, photoIds: this.photoIds}
    return oi;
  }
  getStatusIcon(): string {
    switch (this.orderStatus) {
      case 'registered': {
        return 'add_box';
      }
      case 'waiting for part': {
        return 'hourglass_empty';
      }
      case 'tasks done': {
        return 'assignment_turned_in';
      }
      case 'ready for pickup': {
        return 'contact_mail';
      }
      case 'done': {
        return 'done';
      }
      case 'canceled': {
        return 'clear';
      }
      default: {
        return '';
      }
    }
  }
  getStatusDisplay(): string {
    switch (this.orderStatus) {
      case 'registered': {
        return 'Felvéve';
      }
      case 'waiting for part': {
        return 'Alkatrészre vár';
      }
      case 'tasks done': {
        return 'Elkészült, értesíthető';
      }
      case 'ready for pickup': {
        return 'Átadásra vár, értesítve';
      }
      case 'done': {
        return 'Átadva, kész';
      }
      case 'canceled': {
        return 'Visszamondva';
      }
      default: {
        return '';
      }
    }
  }
  isDeadlineUrgent(): boolean {
    const oneWeekInTimestamp: number = 604800000;
    var lessThanAWeek: boolean = (this.deadline - moment().valueOf()) <= oneWeekInTimestamp;
    return lessThanAWeek;
  }
  public set orderStatus(newStatus: string) {
    if (newStatus === 'tasks done' || newStatus === 'ready for pickup') {
      if (this.doneTasks === '') {
        this.doneTasks = this.task;
      }
    }
    if (newStatus === 'done' && this.guarantee != 0 && this.guaranteeStartTime == 0) {
      let currentTime = moment().endOf('day');
      this.guaranteeEndTime = (moment(currentTime).add(this.guarantee, 'M')).valueOf();
      this.guaranteeStartTime = currentTime.valueOf();
    }
    this._orderStatus = newStatus;
  }
  public get orderStatus() {
    return this._orderStatus;
  }
}

export interface OrderInterface {
  id: string;
  serialNumber: number;
  createdByUser: string;
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
  guaranteeStartTime: number;
  guaranteeEndTime: number;
  advancePayment: number;
  notes: string;
  doneTasks: string;
  guarantee: number;
  handoverState: string;
  photoIds: string[];
}


export interface OrderStatusInterface {
  value: string;
  viewValue: string;
  icon: string;
}

export const orderStatusSelection: OrderStatusInterface[] = [
  { value: 'registered', viewValue: 'Felvéve', icon:'add_box' },
  { value: 'waiting for part', viewValue: 'Alkatrészre vár', icon:'hourglass_empty' },
  { value: 'tasks done', viewValue: 'Elkészült, értesíthető', icon:'assignment_turned_in'},
  { value: 'ready for pickup', viewValue: 'Átadásra vár, értesítve', icon:'contact_mail' },
  { value: 'done', viewValue: 'Átadva, kész', icon:'done'},
  { value: 'canceled', viewValue: 'Visszamondva', icon:'clear'}
];

export interface OrderSortingInterface {
  value: string;
  viewValue: string;
  icon: string;
}

export const sortingStatusSelection: OrderSortingInterface[] = [
  { value: 'name', viewValue: 'Tárgy', icon: "title" },
  { value: 'customerName', viewValue: "Ügyfél", icon: "person"},
  { value: 'creationTime', viewValue: 'Felvétel', icon: "note_add" },
  { value: 'lastUpdatedTime', viewValue: 'Frissítve', icon: "edit"  },
  { value: 'deadline', viewValue: 'Határidő', icon: "calendar_today" },
];
