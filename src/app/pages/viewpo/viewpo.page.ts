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
  total:any=[];
  pocount:any=[];
  pocount1:any=[];
  pocount2:any=[];
  pocount3:any=[];
  pocount4:any=[];

  open:any=[];
  disapproved:any=[];
  popending:any=[];
  closed:any=[];

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
    // this.showLoading();
    // this.cart();
    this.get_po();
    this.cart_total();
    this.po_data_count();
  }

  ionViewDidLeave(){
    this.cart_total();
  }
  
  ionViewWillEnter(){
    this.cart_total();
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

          this.open = this.response2[0][0];
          // console.log(this.open)    
          this.disapproved = this.response2[1][0];
          this.popending = this.response2[2][0];
          this.closed = this.response2[3][0];

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

  
      land(id : any,status:any,p_status:any){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            id : id,
            status : status,
            p_status : p_status,

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

      handleRefresh(event :any) {
        setTimeout(() => {
          // Any calls to load data go here
         
          
          this.get_po();
    this.cart_total();
    this.po_data_count();
          event.target.complete();
        }, 2000);
      };
    
      cart_total(){
        this.api2.getCart(this.getuserdata.id).subscribe({
            next:(data) =>{
              console.log(data);
              this.total = data;
            
            },
            error:() =>{
              alert('error');
           
            },
            complete:() =>{
           
                  
            }
          })
        }
    

      openPage(url :any){
        this.router.navigateByUrl(url)
      }
      po_data_count(){
        this.api2.getpodashcount(this.getuserdata.id).subscribe({
            next:(data) =>{
              console.log(data);
              this.pocount = data;
              
            
            },
            error:() =>{
              alert('error');
           
            },
            complete:() =>{
              this.pocount1 = this.pocount[0][0].po_open;
              // console.log(this.pocount1)
              this.pocount2 = this.pocount[2][0].po_closed;
              // console.log(this.pocount2)
              this.pocount3 = this.pocount[1][0].po_pending;
              this.pocount4 = this.pocount[3][0].po_disapproved;

           
                  
            }
          })
        }

     
}
