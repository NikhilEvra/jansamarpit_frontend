import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];

  response:any=[];

  constructor(
    private router: Router,
    private api : FormService
  ) {
     console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }  }

  ngOnInit() {
    this.sales();
  }

  ionViewWillEnter(){
    this.sales();
  }
  openPage(url : any){
    this.router.navigateByUrl(url);
  }

  sales(){
    this.api.getSales(this.getuserdata.id).subscribe({
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
 
  handleRefresh(event :any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  }

