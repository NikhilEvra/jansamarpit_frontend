import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/service/form/form.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-salerecord',
  templateUrl: './salerecord.page.html',
  styleUrls: ['./salerecord.page.scss'],
})
export class SalerecordPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
 items:any=[];
 response:any=[];
 response2:any=[];
 isModalOpen = false;
  constructor(
    private httpapi : FormService,
    private router :Router,
    private iab : InAppBrowser
  ) {
     console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } }

  ngOnInit() {
    this.getAllSale();
    this.generateItems();

  }
  private generateItems() {
    const count = this.response.length + 1;
    for (let i = 0; i < 5; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev :any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getAllSale(){
    this.httpapi.getSaleBydealerId(this.getuserdata.id).subscribe({
      next:(data) =>{
        console.log(data);
        this.response = data;
      },
      error:() =>{
        alert('error');
      },
      complete:() =>{
      }
    })
  }
  
  fire(isOpen: boolean, id:any){
    this.httpapi.getSaleById(id,this.getuserdata.id).subscribe({
      next:(data) =>{
        console.log(data);
        this.response2 = data;
      },
      error:() =>{
        alert('error');
      },
      complete:() =>{
      }
    })
    this.isModalOpen = isOpen;
    // console.log(id);

  }
 fire2(){
  this.isModalOpen = false;
 }

 openInAppBrow2(invoice:any) {
  const browser = this.iab.create('https://evramedia.com/apifolder/print_invoice.php?id=' + this.getuserdata.id  + '&invoice_id=' + invoice, '_system', 'location=no, zoom=yes ');
  browser.on('loadstart').subscribe(data => {
   console.log(data.url);
   if (data.url == 'https://evramedia.com') {
     browser.close();
   }
  });
 
 }

  // openInAppBrow1(invoice:any) {
  //   const browser = this.iab.create('https://evramedia.com/apifolder/invoice.php?id=' + this.getuserdata.id  + '&invoice_id=' + invoice, '_self', 'location=no, zoom=yes ');
  //   browser.on('loadstart').subscribe(data => {
  //    console.log(data.url);
  //    if (data.url == 'https://evramedia.com') {
  //      browser.close();
  //     //  this.openInAppBrow2(invoice:any);
  //    }
  //   }); 
  //  }

}
