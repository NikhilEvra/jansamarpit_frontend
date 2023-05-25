import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { AnyMxRecord } from 'dns';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saleform',
  templateUrl: './saleform.page.html',
  styleUrls: ['./saleform.page.scss'],
})
export class SaleformPage implements OnInit {
  form! : FormGroup;
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  response : any=[];
  myfun = false;
  models:any=[];
  modelname!:any;
  varientname:any=[];
  color!:any;
  test:any=[];
  inventory:any=[];
  
  invoiceid:any=['00039'];
  response2:any=[];



  handlerMessage = '';
  roleMessage = '';
  constructor(
    private formb : FormBuilder,
    private httpapi : FormService,
    private loadingCtrl : LoadingController,
    private router : Router,
    private alertController: AlertController,
    private iab : InAppBrowser,
  ) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }
  }

  IonViewDidLeave(){
    this.loadingCtrl.dismiss();
  }


  Initform(){
    this.form = this.formb.group({    
      name: [this.getuserdata.id, Validators.required],
      c_name: ['',Validators.required],
      a_mobile: [''],
      c_mobile:['',Validators.required],
      location: ['', Validators.required],
      model_name: ['', Validators.required], 
      color:[this.varientname,Validators.required], 
      chassis: ['', Validators.required],
      amount: ['', Validators.required],
      battery:['',Validators.required],
      charger:['',Validators.required],
      motor:['',Validators.required],
      controller:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pan:['',Validators.required],
      discount:[''],
      dist:['',Validators.required],  
      pincode:['',Validators.required],
      email:['',Validators.required]
      // filename : ['']
    })
  }

  ngOnInit() {
  this.Initform();
  this.model();
  }

  submit(){
    this.showLoading();
    this.getuserdata.id = this.form.value.name;

   
    if(!this.form.value.discount){
      this.form.value.discount = '0'
    }
    // console.log(this.form.value);  
    this.httpapi.addsaleformdata(this.form.value.name,this.form.value.c_name,this.form.value.c_mobile,this.form.value.location,this.form.value.model_name,this.form.value.color,this.form.value.chassis, this.form.value.amount,this.form.value.discount, this.form.value.a_mobile,this.test,this.form.value.battery,this.form.value.motor,this.form.value.charger,this.form.value.controller,
      this.form.value.city,this.form.value.state,this.form.value.pan,this.form.value.dist,this.form.value.pincode,this.form.value.email).subscribe({
      next:(data) => {
        console.log(data);
        this.response2 = data;
        // Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});

      
         
      },
      error:() => {
        console.log('err');
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
      },
      complete:() => {
        this.response = this.response2;
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
         this.router.navigateByUrl('/salerecord');
        //  this.openInAppBrow2();
      }
    })
    this.form.reset();
  
   }

   async showLoading() {
    const loading = await this.loadingCtrl.create({ 
      duration: 3000,
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

  model(){
    this.httpapi.getAllProduct().subscribe({
      next:(data) =>{
        console.log(data);
        this.models = data;
       
       
      },
      error:() =>{
        alert('error');
     
      },
      complete:() =>{
   
      }
    })
   
  }

  varient(){
    console.log(this.modelname);
    this.httpapi.getVarient(this.modelname,this.getuserdata.id).subscribe({
      next:(data) =>{
        console.log(data);
      this.varientname = data;
       
      },
      error:() =>{
        alert('error');
     
      },
      complete:() =>{
   
      }
    })
   
    this.myfun = true;

  }

  checkinventory(){
    this.test = '(' + this.color + ')' ;
    this.httpapi.check(this.modelname,this.test, this.getuserdata.id).subscribe({
      next:(data) =>{
        console.log(data);
        this.inventory = data;
 
      },
      error:() =>{
        // alert('error');
     
      },
      complete:() =>{
        if(this.inventory[0].inventory == '0'){
          this.modelname = null;
          this.varientname = null;
          this.color = null;
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Inventory Not available Plase raise a po for sale',  heightAuto: false ,  timer: 3000});
          // this.form.value.color.reset();
          // this.form.reset();
          // this.router.navigateByUrl('/sales');
        }
      }
    })
   
  }

  land(){
    this.router.navigateByUrl('/poinvoice');
  }

  openInAppBrow2() {
    const browser = this.iab.create('https://evramedia.com/apifolder/print_invoice.php?id=' + this.getuserdata.id  + '&invoice_id=' + this.invoiceid, '_self', 'location=no, zoom=yes ');
    browser.on('loadstart').subscribe(data => {
     console.log(data.url);
     if (data.url === 'https://evramedia.com') {
       browser.close();
      //  this.test1();
     }
    }); 
   }

  test1(){
     const browser = this.iab.create('https://evramedia.com/apifolder/print_invoice.php?id=' + this.getuserdata.id  + '&invoice_id=' + this.invoiceid, '_system', 'location=no, zoom=yes ');
    browser.on('loadstart').subscribe(data => {
     console.log(data.url);
     if (data.url === 'https://evramedia.com') {
       browser.close();
       
     }
    });
  }

  re(){
    
  }
}
