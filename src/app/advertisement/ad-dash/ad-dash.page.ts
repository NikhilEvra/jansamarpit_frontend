import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-dash',
  templateUrl: './ad-dash.page.html',
  styleUrls: ['./ad-dash.page.scss'],
})
export class AdDashPage implements OnInit {
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;

  adv_dash:any=[];

  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  form!:FormGroup;
  form2!:FormGroup;
  form3!:FormGroup;


  adv:any=[];

  response:any=[];
  response2:any=[];
  response3:any=[];


  edate:any=[];

  handlerMessage = '';
  roleMessage = '';
  constructor(
    private formb: FormBuilder,
    private httpapi : FormService,
    private router : Router,
    private loadingCtrl : LoadingController,
    private datePipe: DatePipe,
    private alertController: AlertController
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
      dealership_name:[this.getuserdata.dealership_name,Validators.required],
      date:['',Validators.required],
      endingdate:[this.edate],

    });

    this.form2 = this.formb.group({    
      name: [this.getuserdata.id],
      advertisement:['',Validators.required]
    });

    this.form3 = this.formb.group({    
      name: [this.getuserdata.id],
      advertisement:['',Validators.required],
      amount:['',Validators.required],
      file: ['',Validators.required],
    });

  }

  ngOnInit() {
    this.Initform();
    this.get_ads_name();
    this.get_dash_data();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }
  setOpen3(isOpen: boolean) {
    this.isModalOpen3 = isOpen;
  }

  da(){
    var someDate = new Date(this.form.value.date);
var numberOfDaysToAdd = 10;
var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
console.log(new Date(result));

var date = result;
var res = this.datePipe.transform(date,"yyyy-MM-dd");
// console.log(res );
this.edate = res;
// console.log(this.edate);


  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.submit();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  submit(){
    console.log(this.form.value);
    
    this.httpapi.mobile_van_date(this.form.value).subscribe({
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
         this.isModalOpen = false;
       
      }
    })
  }

  get_ads_name(){
    this.httpapi.advertisement_name().subscribe({
      next:(data) => {
        console.log(data);
        this.adv = data;
    
      },
      error:() => {
        // console.log('err');
       
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
         
      },
      complete:() => {
       
      }
    })

  }

  get_dash_data(){

    this.httpapi.advertisement_dashdash_data(this.getuserdata.id).subscribe({
      next:(data) => {
        console.log(data);
        this.adv_dash = data[0];
    
      },
      error:() => {
        // console.log('err');
       
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
         
      },
      complete:() => {
    
       
      }
    })

  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.submit_adtype();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  submit_adtype(){
    console.log(this.form2.value);
    this.httpapi.adv_select(this.form2.value).subscribe({
      next:(data) => {
        console.log(data);
        this.response2 = data;
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response2.message,  heightAuto: false ,  timer: 3000});
     
      },
      error:() => {
        console.log('err');
       
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
         
      },
      complete:() => {
      this.form2.reset();
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response2.message,  heightAuto: false ,  timer: 3000});
         this.isModalOpen2 = false;
      }
    });
  }

  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.submit_reimburse();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  submit_reimburse(){
    // console.log(this.form3.value);
    if(this.form3.value.amount > this.adv_dash.left_amt){
      Swal.fire({'imageUrl' :'assets/icon/error.png','imageHeight':'100px', 'title': 'Amount Exceeds Your Budget! Please enter a lower amount',  heightAuto: false ,  timer: 3000});

    }
    else{
    this.httpapi.adv_reimbursement(this.form3.value).subscribe({
      next:(data) => {
        console.log(data);
        this.response3 = data;
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response3.message,  heightAuto: false ,  timer: 3000});
     
      },
      error:() => {
        console.log('err');
       
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
         
      },
      complete:() => {
      this.form3.reset();
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response3.message,  heightAuto: false ,  timer: 3000});
         this.isModalOpen3 = false;
      }
    })
    }
    

  }

  uploadPhoto(fileChangeEvent : any) {
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];
    console.log(photo);
    this.form3.get('file')?.setValue(photo);
 
  }

}
