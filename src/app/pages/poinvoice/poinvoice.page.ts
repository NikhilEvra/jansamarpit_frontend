import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poinvoice',
  templateUrl: './poinvoice.page.html',
  styleUrls: ['./poinvoice.page.scss'],
})
export class PoinvoicePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  print(){
    window.print();
  }
}
