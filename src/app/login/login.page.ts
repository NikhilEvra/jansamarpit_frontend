import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { LoginService } from '../service/login/login.service';
import Swal from 'sweetalert2';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form! : FormGroup;
  response: any=[
    {
        "id": "11",
        "name": "niki",
        "email": "niki@gmail.com",
        "password": "1111",
        "phone": "7982567755"
    }
];
  response2:any=[];
  



  constructor(
    private router : Router,
    private formb: FormBuilder,
    private toastctrl : ToastController,
    private api : LoginService,
    private loadingCtrl: LoadingController,
    private menuCtrl : MenuController,
    private platform : Platform,
    private _popoverCtrl : PopoverController,
    
  ) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      App.exitApp();
    });
  }


initForm(){  
    this.form = this.formb.group({    
      phone: ['', Validators.required],
      spassword: ['', Validators.required],  
      
    })
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.initForm(); 
  }
  ionViewDidLeave(){
    this.loadingCtrl.dismiss();
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter(){
    this._popoverCtrl.dismiss();
  }
  
  
  openPage(url :any){
    this.router.navigateByUrl(url);
  }
 login(){
  this.showLoading();
  localStorage.setItem('user',JSON.stringify(this.response[0]));
        //this.api.menu.next(this.response2);
        this.router.navigateByUrl('/dashboard');
        Swal.fire({
            'imageUrl' :'assets/icon/login.gif',
            'imageHeight':'100px', 
            'title': 'You have successfully loged in',
             heightAuto: false , 
             timer: 3000
            });
        
  // this.api.getlogindata(this.form.value.phone, this.form.value.spassword).subscribe({
  //   next:(data) =>{
  //     console.log(data);
  //     this.response = data;
  //    this.response2 = data;
  //   },
  //   error:() =>{
  //     this.loadingCtrl.dismiss();
  //     // alert('error occured');
  //     this.presentToast('Internal Server Error.' , 'Danger');
  //   },
  //   complete:() =>{
   
  //     if(this.response.status == false){
  //        Swal.fire({
  //           'imageUrl' :'assets/icon/login.gif',
  //           'imageHeight':'100px', 
  //           'title': this.response.message,
  //            heightAuto: false , 
  //            timer: 3000
  //              });
  //       // Swal.fire({'title': 'You have successfully log in', heightAuto: false});
  //       // this.presentToast(this.response.message , 'warning');
  //       // alert(this.response.message)
  //     }
  //     else{
  //       localStorage.setItem('user',JSON.stringify(this.response[0]));
  //       //this.api.menu.next(this.response2);
  //       this.router.navigateByUrl('/dashboard');
  //       Swal.fire({
  //           'imageUrl' :'assets/icon/login.gif',
  //           'imageHeight':'100px', 
  //           'title': 'You have successfully loged in',
  //            heightAuto: false , 
  //            timer: 3000
  //           });
        
  //       // this.presentToast('You have successfully log in' , 'success');
  //     }        
  //   }
  // })
  // this.router.navigateByUrl('/dashboard');
  // Swal.fire({
  //           'imageUrl' :'assets/icon/login.gif',
  //           'imageHeight':'100px', 
  //           'title': 'You have successfully loged in',
  //            heightAuto: false , 
  //            timer: 3000
  //           });
}

async presentToast(msg: any, color: any) {
  const alert = await this.toastctrl.create({
    message: msg,
    color: color,
    duration: 3000,
    position: 'middle'
  })
  alert.present();
}

signup(){
  this.router.navigateByUrl('/signup');
}


async showLoading() {
  const loading = await this.loadingCtrl.create({
    // message: 'Dismissing after 3 seconds...',
    // duration: 3000,
  });

  loading.present();
}
}
