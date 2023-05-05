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
  response: any=[];
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
  
  }


initForm(){  
    this.form = this.formb.group({    
      phone: ['', Validators.required],
      spassword: ['', Validators.required],  
      
    })
    this.menuCtrl.enable(false);
  }

  // ionViewDidEnter(){
  //   localStorage.clear();
  // }
  // ionViewwillEnter(){
  //   localStorage.clear();
  // }
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
  this.api.getlogindata(this.form.value.phone, this.form.value.spassword).subscribe({
    next:(data) =>{
      console.log(data);
      this.response = data;
     this.response2 = data;
    },
    error:() =>{
      this.loadingCtrl.dismiss();
      // alert('error occured');
      Swal.fire({
        'imageUrl' :'assets/icon/login.gif',
        'imageHeight':'100px', 
        'title': 'Internal Server Error',
         heightAuto: false , 
         timer: 3000
        });
    },
    complete:() =>{
   
      if(this.response.status == false){
         Swal.fire({
            'imageUrl' :'assets/icon/login.gif',
            'imageHeight':'100px', 
            'title': this.response.message,
             heightAuto: false , 
             timer: 3000
               });
      }
      else{
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
           
         
   
        
        
      }        
    }
  })

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
     duration: 3000,
  });

  loading.present();
}

close(){
   App.exitApp();
}
// test(){
//   Swal.fire({ 'title': 'exit app!',  heightAuto: false ,  timer: 3000}).then(()=> {
//  this.close();
//  },(error: any) => console.log(error));
// }

}
