import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
  loginbanner:any=[{
    url:'https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?w=2000',
    heading:'Lets build nation'
  },{
    url:'https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg',
    heading:'Come for '

  }
];

form!: FormGroup;
form2!: FormGroup;

res:any=[];
show = false;
dat :any=[];
res2:any=[];
dat1:any=[];

isModalOpen = false;
  constructor(
    private router : Router,
    private formb : FormBuilder,
    private api : LoginService
  ) { }

  ngOnInit() {

    this.initForm();
    this.initForm2();


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
  submit(){
  console.log(this.form.value);

// this.dat = JSON.stringify(this.form.value);

  
  
  this.api.sendOtp1(this.form.value).subscribe({
    next:(data) =>{
      console.log(data);   
      this.res = data;
     
   
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
      this.isModalOpen = true;
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
    //  console.log(this.form.value,this.form2.value);
    //  console.log(this.form2.value.otp);
    
     console.log(JSON.stringify({ phone:this.form.value.phone, otp: this.form2.value.otp }));
this.dat1 = JSON.stringify({ phone:this.form.value.phone, otp: this.form2.value.otp })
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

  redirect(url:any){
    this.router.navigateByUrl(url);
  }
}
