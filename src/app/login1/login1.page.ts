import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../service/login/login.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { PollService } from '../service/poll/poll.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
  loginbanner:any=[{
    url:'assets/login/logo-4.jpg',
    heading:'Lets build nation'
  
  }
  // ,{
  //   url:'https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg',
  //   heading:'Come for '

  // }
];

form!: FormGroup;
form2!: FormGroup;

res:any=[];
show = false;
dat :any=[];
res2:any=[];
dat1:any=[];
question:any=[];

envpath:any=[];

isModalOpen = false;
handlerMessage = '';
roleMessage = '';

addlanguageList=[
  {code:"en",title:"english",text:"english"},
  {code:"hi",title:"hindi",text:"हिंदी"},

];

  constructor(
    private router : Router,
    private formb : FormBuilder,
    private api : LoginService,
    private translate : TranslateService,
    private api2 : PollService,
    // private alertController: ActionSheetController,
    private alertController: AlertController
  ) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en','hi']);
   }

  ngOnInit() {

    this.initForm();
    this.initForm2();
    this.get_poll();
    // this.presentActionSheet();
this.envpath = environment.apiurl;

  }

  initForm(){  
    this.form = this.formb.group({    
      phone: ['', Validators.required],
      
    })
  }

  initForm2(){  
    this.form2 = this.formb.group({    
      otp: ['', Validators.required],
      
    })
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


  submit(){
  // console.log(this.form.value);

// this.dat = JSON.stringify(this.form.value);

  // this.router.navigateByUrl('/app/tabs/tab1');
  
  const dat = {"phone" : this.form.value.phone};
  // alert(dat.phone);   

  this.api.sendOtp1(dat).subscribe({
    next:(data) =>{
      alert(data);   
      this.res = data;
     
   
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
      this.isModalOpen = true;
      this.startTimer();
      setTimeout(() => {
        this.isModalOpen = false;
      }, 120000);
      Swal.fire({
        'imageUrl' :'assets/icon/login.gif',
        'imageHeight':'100px', 
        'title': this.res.message,
         heightAuto: false , 
         timer: 3000
        });
     
    }
  })

  }
 


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
   
  }

  validate_otp(){    
    this.isModalOpen = false;

     console.log(JSON.stringify({ phone:this.form.value.phone, otp: this.form2.value.otp }));
     // this.dat1 = JSON.stringify({ phone:this.form.value.phone, otp: this.form2.value.otp });
     this.dat1 =  {"phone":this.form.value.phone,
     "otp":this.form2.value.otp};

    this.api.validate_otp(this.dat1).subscribe({
      next:(data) =>{
        console.log(data);   
        this.res2 = data;
       
      },
      
      error:() =>{
       
        Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'Invalid Phone Number',
           heightAuto: false , 
           timer: 3000
          });
      },

      complete:() =>{
        

        localStorage.setItem('user',JSON.stringify(this.res2.data[0]));
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

          }
    })
  
  }

  redirect(url:any){
    this.router.navigateByUrl(url);
  }

  async presentActionSheet() {
    const alert = await this.alertController.create({
      header: 'Choose Your Language',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Hindi',
          role: 'Hindi',
          handler: () => {
            this.handlerMessage = 'Hindi';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            // this.submit();
            // console.log('yes')
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  OnlanguageChange(event:any){
    this.translate.use(event.target.value ?  event.target.value : "en");
  // this.popovercontroller.dismiss();

    }

    
  get_poll(){
    this.api.test().subscribe({
      next:(data:any) =>{
        console.log(data);
        this.question = data;
       
    
      },
      error:() =>{
       
      alert('No PAth called');
      },
      complete:() =>{
       
     
       
      }
    })
  
  }
}
