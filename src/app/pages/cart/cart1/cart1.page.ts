import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart1',
  templateUrl: './cart1.page.html',
  styleUrls: ['./cart1.page.scss'],
})
export class Cart1Page implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];

  form!: FormGroup
  model:any=[];
  model_name:any=[];
  response:any=[];
  myfun = false;
  priceWithbatt!:any;
  priceWithOutbatt!:any;
  amount!:any;
  amount2!:any;
  total!:any;
  varient!:any;
  price:any=[];

  handlerMessage = '';
  roleMessage = '';
 
  constructor(
    private route : ActivatedRoute,
    private formb : FormBuilder,
    private api : CartService,
    private router : Router,
    private loadingCtrl : LoadingController,
    private alertController: AlertController
  ) { console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }}

  Initform(){
    this.form = this.formb.group({    
     dealerid: [this.getuserdata.id, Validators.required],
     model : [this.model_name,Validators.required],
     color : ['',Validators.required],
     quantity_with_batt: ['',Validators.required],
     quantity_without_batt:['',Validators.required],
    //  totalamount:[this.total, Validators.required],
    amountWithOutBatt:[this.amount2],
    amountWithBatt:[this.amount],
    })
  }
  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.model = params;
      this.model_name = this.model.model;
    }
  );
  
  this.Initform();
  this.getdata();
  }

  getdata(){
    this.showLoading();
    this.api.getVarients(this.model_name).subscribe({
      next:(data) =>{
        console.log(data);
        this.response = data;
    
       
     
      },
      error:() =>{
        alert('error');
     
      },
      complete:() =>{
        // this.loadingCtrl.dismiss();
      }
    })
    
  }

  show(){
    this.api.getPrice(this.varient, this.model_name).subscribe({
      next:(data) =>{
        console.log(data);
        this.price = data;
        console.log(this.price[0].price_wb)
        
      },
      error:() =>{
        alert('error');
     
      },
      complete:() =>{
        // this.loadingCtrl.dismiss();
      }
    })
    this.myfun = true;
  }
  calAmount(){
   this.amount = this.priceWithbatt * this.price[0].price_wb;
  }
  calAmount2(){
    this.amount2 = this.priceWithOutbatt * 90000;
   }

   submit(){
    this.showLoading();
    console.log(this.form.value);  
    this.api.postCartData(this.form.value.dealerid,this.form.value.model,this.form.value.color,this.form.value.quantity_with_batt,this.form.value.quantity_without_batt,this.form.value.amountWithBatt,this.form.value.amountWithOutBatt).subscribe({
      next:(data) => {
        console.log(data);
        this.response = data;
      },
      error:() => {
        console.log('err');
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
      },
      complete:() => {
        this.router.navigateByUrl('/dashboard');
        Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
        // this.loadingCtrl.dismiss();
      }
    })
   }

   async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading please Wait...',
      duration: 2000,
    });

    loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.submit();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
