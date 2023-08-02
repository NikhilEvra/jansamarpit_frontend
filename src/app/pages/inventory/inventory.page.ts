import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  data:any=['test'];
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];
  
  response:any=[];
  total:any=[];

  constructor(
    private router: Router,
    private api : FormService,
    private loadingCtrl : LoadingController,
  ) {  console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } }

  ngOnInit() {
    this.inventory();
    this.cart();
    
  }

  openPage(url: any){
    this.router.navigateByUrl(url);
  }

  inventory(){
    this.api.getInventory(this.getuserdata.id).subscribe({
        next:(data) =>{
          console.log(data[0]);
          this.response = data;
          console.log(this.response);
         
        },
        error:() =>{
          alert('error');
       
        },
        complete:() =>{
    
              
        }
      })
    }
    cart(){
      this.api.getCart(this.getuserdata.id).subscribe({
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

      varcount(model : any){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            model : model
          }
        };
        
        this.router.navigate(['/varientinventory'], navigationExtras);
        this.showLoading();
      }

      async showLoading() {
        const loading = await this.loadingCtrl.create({
          message: 'Loading please Wait...',
          duration: 3000,
        });
    
        loading.present();
      }

      // viewpo(){
      //   this.router.navigateByUrl('/viewpo');
      // }
}
