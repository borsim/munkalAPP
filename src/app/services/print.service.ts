import { Router } from "@angular/router";
import { Injectable, HostListener  } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  isPrinting = false;

  constructor(private router: Router) { }

  printDocument(documentName: string, orderId: string) {
    console.log("Start printing");
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, orderId]
      }}]);
  }

  onDataReady() {
    if (this.isPrinting) {
      setTimeout(() => {
        window.print();
        this.isPrinting = false;
      });
    }
  }

  @HostListener("window:afterprint", [])
  onWindowAfterPrint() {
    setTimeout(() => {
          this.router.navigate([{ outlets: { print: null }}]);
    }, 10);
  }
}