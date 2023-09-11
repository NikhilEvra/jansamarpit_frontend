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
  form2! :FormGroup;
  response:any=[];
  response2:any=[];
  response3:any=[];
  response4:any=[];

  dat1 : any=[];
  
  isModalOpen = false;

  homeBanner: any = [{
    url: 'https://evramedia.com/apifolder/catalog/13.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/14.png'
  }];

  loginbanner:any=[{
    url:'https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?w=2000',
    heading:'Lets build nation'
  },{
    url:'https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg',
    heading:'Come for '

  }
];

  slideServiceReport = {
    initialSlide: 0,
    // slidesPerView: 1.1,
    autoplay: true
  }; 

  dat:any=[];

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
      name: [''],
      email: [''],
      // password: ['', Validators.required],  
      phone:['', Validators.required],
      admin:['']
     
    })
  }

  initForm2(){  
    this.form2 = this.formb.group({    
      otp: ['', Validators.required],      
    })
  }
  ngOnInit() {
    this.initForm();
    this.initForm2();
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave(){
    this.loadingCtrl.dismiss();
    this.menuCtrl.enable(false);
  }
  signup(){
// this.dat = JSON.stringify({ phone :  this.form.value.phone})
    this.httpapi.sendOtp1(this.form.value).subscribe({
      next:(data) => {
        console.log(data);
        this.response = data;
       
      
      },
      error:() => {
        console.log('err');
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
       
      },
      complete:() => {
        this.response2 = this.response;
        if(this.response2.status == false){
          Swal.fire({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
             'imageUrl' :'assets/icon/login.gif',
             'imageHeight':'100px', 
             'title': this.response2.message,
              heightAuto: false , 
              timer: 3000
                });
       }
       else{
        
        this.setOpen(true);
         
                   
       }  
        
      }
    })
   
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
  }, 120000);

  }
 
checkOtp(){
  // console.log(this.form.value.phone);
  this.isModalOpen = false;
  this.dat1 = {"phone":this.form.value.phone, "otp" : this.form2.value.otp}
  this.httpapi.validateOtp(this.dat1).subscribe({
    next:(data) => {
      console.log(data);
      this.response3 = data;
      console.log(this.response3.data[0])
     
    },
    error:() => {
      console.log('err');
       Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
     
    },
    complete:() => {
      this.response4 = this.response3.data[0];

       localStorage.setItem('user',JSON.stringify(this.response4));
       //this.api.menu.next(this.response2);
       this.isModalOpen = false;
       this.router.navigateByUrl('/app/tabs/tab1');
       Swal.fire({
           'imageUrl' :'assets/icon/login.gif',
           'imageHeight':'100px', 
           'title': 'You have successfully loged in',
            heightAuto: false , 
            timer: 3000
           });

    //   if(this.response4.status == false){
    //     Swal.fire({
    //        'imageUrl' :'assets/icon/login.gif',
    //        'imageHeight':'100px', 
    //        'title': this.response4.message,
    //         heightAuto: false , 
    //         timer: 3000
    //           });
    //  } else{
    //   // this.isModalOpen = false;
    //   this.router.navigateByUrl('/login');
    //  }

    }
  })
 
  
}
}
