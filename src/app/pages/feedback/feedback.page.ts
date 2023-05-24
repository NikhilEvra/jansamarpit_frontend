import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  form! : FormGroup;

  handlerMessage = '';
  roleMessage = '';

  constructor(private loadingCtrl : LoadingController,
    private router : Router,
    private formb : FormBuilder,
    private httpapi : FormService,
    private alertController: AlertController) { }

    Initform(){
      this.form = this.formb.group({    
        name: ['nikhil', Validators.required],
        location: ['', Validators.required],
        designation: ['', Validators.required],  
        no_of_vehicles: ['', Validators.required],
        duration : ['', Validators.required],
        any_other_vehicle : ['',Validators.required],
        features : ['', Validators.required],
        improvement : ['',Validators.required],
        p_remark: [''],
        t_remark: [''],
        s_remark: [''],
        spare_part_remark: [''],
        f_remark:[''],
        rating:['', Validators.required],
      })
    }

  ngOnInit() {
    this.Initform();
  }
  
  ionViewDidLeave(){
    this.loadingCtrl.dismiss();
  }
 
   submit(){
    this.showLoading();

    this.httpapi.feedbackformdata(this.form.value.name ,this.form.value.location, this.form.value.designation, this.form.value.no_of_vehicles,this.form.value.duration,this.form.value.any_other_vehicle,
      this.form.value.features,this.form.value.improvement,this.form.value.p_remark,this.form.value.t_remark,this.form.value.s_remark,this.form.value.spare_part_remark,this.form.value.f_remark,
      this.form.value.rating).subscribe({
      next:(data) => {
        console.log(data);
       
        if (data.status) {
           Swal.fire({'imageUrl' :'assets/icon/success.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000});
        
          this.router.navigateByUrl('/dashboard');
          
        } else if(data.status == false){
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000});
      
          this.loadingCtrl.dismiss();
        } 
      },
      error:() => {
        console.log('err');
        this.loadingCtrl.dismiss();
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
        
       
      },
      complete:() => {
       
      }
    })

   }

async showLoading() {
  const loading = await this.loadingCtrl.create({
    // message: 'Dismissing after 3 seconds...',
    duration: 3000,
  });
  loading.present();
}

openPage(url:any){
  this.router.navigateByUrl(url);
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
}
