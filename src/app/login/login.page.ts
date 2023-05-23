import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form2!:FormGroup;
  response: any=[];
  response2:any=[];
  response3: any=[];
  response4:any=[];
  isModalOpen = false;
  homeBanner: any = [{
    url: 'https://evramedia.com/apifolder/catalog/13.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/14.png'
  }]
  slideServiceReport = {
    initialSlide: 0,
    // slidesPerView: 1.1,
    autoplay: true
  }; 
  

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
      // spassword: ['', Validators.required],  

    })
    this.menuCtrl.enable(false);
  }
  initForm2(){  
    this.form2 = this.formb.group({    
      otp: ['', Validators.required],      
    })
   
  }
  ngOnInit() {
    this.initForm(); 
    this.initForm2();
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

otp(){
  this.api.sendOtp(this.form.value.phone).subscribe({
    next:(data) =>{
      console.log(data);
     
    this.response3 = data;
  
    },
    error:() =>{
     
      Swal.fire({
        'imageUrl' :'assets/icon/login.gif',
        'imageHeight':'100px', 
        'title': 'Internal Server Error',
         heightAuto: false , 
         timer: 3000
        });
    },
    complete:() =>{
      this.response4 = this.response3;
      if(this.response4.status == false){
        Swal.fire({
           'imageUrl' :'assets/icon/login.gif',
           'imageHeight':'100px', 
           'title': this.response4.message,
            heightAuto: false , 
            timer: 3000
              });
          } 
            else{
              this.setOpen(true)
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

timeLeft: number = 120;
  interval:any;

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 120;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }


setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
  this.startTimer();
setTimeout(() => {
  this.isModalOpen = false;
  window.location.reload();
}, 120000);


}

checkOtp(){
  this.showLoading();
  this.isModalOpen = false;
   this.api.ValidateOtp(this.form.value.phone,this.form2.value.otp).subscribe({
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
        this.isModalOpen = false;
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

}
