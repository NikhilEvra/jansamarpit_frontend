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
      // password: ['', Validators.required],  
      phone:['', Validators.required],
      usertype:['',Validators.required]
     
     
    })
    // this.presentToast('test toast', 'success');
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
    this.httpapi.getuserdata(this.form.value.name ,this.form.value.email,  this.form.value.phone, this.form.value.usertype).subscribe({
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
    window.location.reload();
  }, 120000);

  }
 
checkOtp(){
  // console.log(this.form.value.phone);
  this.isModalOpen = false;
  this.httpapi.validateOtp(this.form.value.phone, this.form2.value.otp).subscribe({
    next:(data) => {
      console.log(data);
      this.response3 = data
     
    
    },
    error:() => {
      console.log('err');
       Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
     
    },
    complete:() => {
      this.response4 = this.response3;
      if(this.response4.status == false){
        Swal.fire({
           'imageUrl' :'assets/icon/login.gif',
           'imageHeight':'100px', 
           'title': this.response4.message,
            heightAuto: false , 
            timer: 3000
              });
     } else{
      // this.isModalOpen = false;
      this.router.navigateByUrl('/login');
     }

    }
  })
 
  
}
}
