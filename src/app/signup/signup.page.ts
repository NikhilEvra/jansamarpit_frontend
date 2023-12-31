import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { SignupService } from '../service/signup/signup.service';
import Swal from 'sweetalert2';
import { Country, State, City }  from 'country-state-city';
import { Camera, CameraResultType } from '@capacitor/camera';

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

  currentStep = 1;
  totalSteps = 4;

  homeBanner: any = [{
    url: 'https://evramedia.com/apifolder/catalog/13.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/14.png'
  }];

  loginbanner:any=[{
    url:'assets/login/logo-4.jpg',
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

  id:any=[{
    name:'Adhaar Card'
  },{
    name:'Driving Licence'
  },{
    name:'Pan Card'
  },{
    name:'Passport'
  },{
    name:'Voter Card'
  }]
  
  dat:any=[];
  country:any=[];
  states:any=[];
  cities:any=[];
  co:any=[];
  st:any=[];
  ci:any=[];
  ci2:any=[];
  st2:any=[];

  imageSource:any=[];
  imageSource2:any=[];
  myfun = false;

  im1 = false;
  im2 = false;

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
      name: ['',Validators.required],
      email: ['',Validators.required],
      phone:['',Validators.required],
      // admin:['',Validators.required],
      country:['INDIA'],
      state:['',Validators.required],
      city:['',Validators.required],
      id:['',Validators.required],
      file:[this.imageSource,Validators.required],
      file2:[this.imageSource2,Validators.required],
      address:['',Validators.required],
      pincode:['',Validators.required],
      address2:['',Validators.required],



    })
  }

  initForm2(){  
    this.form2 = this.formb.group({    
      otp: ['', Validators.required],      
    });
  }

  ngOnInit() {
// console.log(Country.getAllCountries())
// console.log(State.getAllStates())
// console.log(City.getAllCities())

    this.initForm();
    this.initForm2();
    this.menuCtrl.enable(false);

    this.country = Country.getAllCountries();
    // console.log(this.country);
    this.co = this.country.name;
    
    this.states = State.getAllStates();
    // console.log(this.states);
    // var s = this.country;
    // const result = this.country.filter((s: { isoCode: string | string[]; }) => s.isoCode.includes('IN'));

      this.st = this.states.filter((s: {
      countryCode: any; isoCode: string | string[]; 
      }) => s.countryCode.includes('IN'));

      console.log(this.st);


      this.cities = City.getAllCities();

      this.ci = this.cities.filter((s: {
      countryCode: any; isoCode: string | string[]; 
      }) => s.countryCode.includes('IN'));
      // console.log(this.ci)

      // this.ci2 = this.ci.filter((s: {
      //   stateCode: any; isoCode: string | string[]; 
      //   }) => s.stateCode.includes('HR'));
      //   console.log(this.ci2);
        
  

  }

  ionViewDidLeave(){
    this.loadingCtrl.dismiss();
    this.menuCtrl.enable(false);
  }

  signup(){
// this.dat = JSON.stringify({ phone :  this.form.value.phone})
    console.log(this.form.value);
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

nextStep() {
  if (this.currentStep < this.totalSteps) {
    this.currentStep++;
  }
}

previousStep() {
  if (this.currentStep > 1) {
    this.currentStep--;
  }
}

getcity(){
  this.st2 = this.st.filter((s: {
    name: any; isoCode: string | string[]; 
    }) => s.name.includes(this.form.value.state));

    console.log(this.st2[0].isoCode);

  this.ci2 = this.ci.filter((s: {
    stateCode: any; isoCode: string | string[]; 
    }) => s.stateCode.includes(this.st2[0].isoCode));
    console.log(this.ci2);

    this.myfun = true;

}

opencam(){
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      // saveToGallery:true 
    });
    // this.form.get('filename')?.setValue(image);
   
    this.imageSource =  'data:image/jpeg;base64,' + image.base64String;
    console.log(this.imageSource);
   
  if(this.imageSource !) {
    this.im1 = true;
 }
  };
  takePicture();

}

opencam2(){
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      // saveToGallery:true 
    });
    // this.form.get('filename')?.setValue(image);
   
    this.imageSource2 =  'data:image/jpeg;base64,' + image.base64String;
    console.log(this.imageSource2);
    if(this.imageSource2 !) {
      this.im2 = true;
   }
  };

  takePicture();

}

check_state(){
  if(!this.form.value.state){
    Swal.fire({
      'imageUrl' :'assets/icon/login.gif',
      'imageHeight':'100px', 
      'title': 'Please Select Your State First',
       heightAuto: false , 
       timer: 3000
      });
  }
}




}
