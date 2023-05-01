import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  handlerMessage = '';
  roleMessage = '';
  constructor(
    private formb : FormBuilder,
    private httpapi : FormService,
    private loadingCtrl : LoadingController,
    private router : Router,
    private alertController: AlertController
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
      color:['',Validators.required], 
      chassis: ['', Validators.required],
      amount: ['', Validators.required],
      // filename : ['']
    })
  }

  ngOnInit() {
  this.Initform();
  }

  submit(){
    this.showLoading();
    // console.log(this.form.value);  
    
    this.httpapi.addsaleformdata(this.form.value.name,this.form.value.c_name,this.form.value.c_mobile,this.form.value.location,this.form.value.model_name,this.form.value.color,this.form.value.chassis, this.form.value.amount, this.form.value.a_mobile).subscribe({
      next:(data) => {
        console.log(data);
        this.response = data;
        Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
         this.router.navigateByUrl('/sales');
      },
      error:() => {
        console.log('err');
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
      },
      complete:() => {
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
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

  
}
