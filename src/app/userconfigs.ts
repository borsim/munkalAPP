export class Userconfig implements UserConfigInterface {
    constructor(
      public id: string = '',
      public showOtherOrders: boolean = true,
      public warrantyCardFooterText: string = '',
      public worksheetCardFooterText: string = '',
      public worksheetCardReceiptText: string = '',
      public companyNameTop: string = '',
      public companyNameBottom: string = '',
      public nextOrderSerialNumber: number = 0,
      public smsNotificationMessage: string = '',
      public emailNotificationMessage: string = '',
      public emailSubject: string = '',
    ) {}
    toInterface() {
      let uc: UserConfigInterface = {id: this.id, showOtherOrders: this.showOtherOrders, warrantyCardFooterText: this.warrantyCardFooterText,
        worksheetCardFooterText: this.worksheetCardFooterText, worksheetCardReceiptText: this.worksheetCardReceiptText,
        companyNameTop: this.companyNameTop, companyNameBottom: this.companyNameBottom,
         nextOrderSerialNumber: this.nextOrderSerialNumber, smsNotificationMessage: this.smsNotificationMessage,
        emailNotificationMessage: this.emailNotificationMessage, emailSubject: this.emailSubject}
      return uc;
    }
}

export interface UserConfigInterface {
    id: string;
    showOtherOrders: boolean;
    warrantyCardFooterText: string;
    worksheetCardFooterText: string;
    worksheetCardReceiptText: string;
    companyNameTop: string;
    companyNameBottom: string;
    nextOrderSerialNumber: number;
    smsNotificationMessage: string;
    emailNotificationMessage: string;
    emailSubject: string;
}