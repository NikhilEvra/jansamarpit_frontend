import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart/cart.service';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-viewpo',
  templateUrl: './viewpo.page.html',
  styleUrls: ['./viewpo.page.scss'],
})
export class ViewpoPage implements OnInit {

  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];
  response:any=[];
  response2:any=[];

  constructor(private api : CartService,
    private loadingCtrl : LoadingController,
    private api2  : FormService,
    private router : Router) { 
         console.log(this.USTEMP);
      if (this.USTEMP) {
        this.getuserdata = JSON.parse(this.USTEMP);
      }
    }

  ngOnInit() {
    this.showLoading();
    // this.cart();
    this.get_po();
  }

 get_po(){
  
 this.api.getAllpo(this.getuserdata.id).subscribe({
        next:(data) =>{
          console.log(data);
          this.response2 = data;
         
        },
        error:() =>{
          alert('error');
       
        },
        complete:() =>{
       this.loadingCtrl.dismiss();
        }
      })
 }
  cart(){
    this.api.getAllCartData(this.getuserdata.id).subscribe({
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

  
      land(id : any,status:any){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            id : id,
            status : status,
          }
        };
        this.showLoading()
        this.router.navigate(['/viewpobyid'], navigationExtras);
        // this.showLoading();
      }
      async showLoading() {
        const loading = await this.loadingCtrl.create({ 
          duration: 3000,
        });
        loading.present();
      }
    
}
