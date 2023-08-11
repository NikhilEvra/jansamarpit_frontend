import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requestcallback',
  templateUrl: './requestcallback.page.html',
  styleUrls: ['./requestcallback.page.scss'],
})
export class RequestcallbackPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  form!:FormGroup;
  response:any=[];
  
  constructor(
    private formb: FormBuilder,
    private httpapi : FormService,
    private router : Router,
    private loadingCtrl : LoadingController,
  ) {
     if (this.USTEMP) {
    this.getuserdata = JSON.parse(this.USTEMP) ;
      }
  }

  Initform(){
    this.form = this.formb.group({    
      name: [this.getuserdata.id],
      location: [this.getuserdata.address,],
      designation: [this.getuserdata.usertype],  
      remark:['',Validators.required],
      topic:['',Validators.required],
      dealership_name:[this.getuserdata.dealership_name,Validators.required],


    })
  }

  ngOnInit() {
    this.Initform();
  }
  submit(){
    this.showLoading();
    console.log(this.form.value);  
    
    this.httpapi.requestcallformdata(this.form.value).subscribe({
      next:(data) => {
        console.log(data);
        this.response = data;
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
     
      },
      error:() => {
        console.log('err');
       
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
         
      },
      complete:() => {
      this.form.reset();
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
         this.router.navigateByUrl('/dashboard');
       
      }
    })
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      duration: 3000,
    });
    loading.present();
  }
}
