import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { SignupService } from '../service/signup/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form! :FormGroup;
  

  constructor(
    private router : Router,
    private formb : FormBuilder,
    private httpapi : SignupService,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private menuCtrl : MenuController,
  ) { }

  initForm(){  
    this.form = this.formb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],  
      phone:['', Validators.required],
     
     
    })
    // this.presentToast('test toast', 'success');
  }

  ngOnInit() {
    this.initForm();
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave(){
    this.loadingCtrl.dismiss();
    this.menuCtrl.enable(false);
  }
  signup(){
    this.showLoading();
    this.httpapi.getuserdata(this.form.value.name ,this.form.value.email, this.form.value.password, this.form.value.phone).subscribe({
      next:(data) => {
        console.log(data);
       
        if (data.status) {
           Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000});
          // this.presentToast(data.message , 'success' );
        
          this.router.navigateByUrl('/login');
        } else if(data.status == false){
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000});
          
          // this.presentToast(data.message, 'danger');
        } 
      },
      error:() => {
        console.log('err');
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
       
        // this.presentToast('Internal server error' , 'warning' )
      },
      complete:() => {
        
      }
    })
    // this.router.navigateByUrl('/login');
    // Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'You have registered successfully!',  heightAuto: false ,  timer: 3000});

  }
  
  async presentToast(msg: any, color: any) {
    const alert = await this.toastCtrl.create({
      message: msg,
      color: color,
      duration: 3000,
      position : 'top'
    })
    alert.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles',
    });

    loading.present();
  }

  openPage(url: any) {
    this.router.navigateByUrl(url);
  }

}
