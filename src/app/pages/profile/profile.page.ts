import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  handlerMessage = '';
  roleMessage = '';
  form! : FormGroup;
  userprofile:any=[];

  constructor(private router : Router,
    private formb : FormBuilder,
    private httpapi : FormService,
    private alertController: AlertController
    
    ) {  
       console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 
  }
  Initform(){
    this.form = this.formb.group({    
      o_pass: ['', Validators.required],
      n_pass: ['', Validators.required],
      r_n_pass: ['', Validators.required],  
      
      
    })
  }

  ngOnInit() {
    this.Initform();
    this.getprofile();
  }

  ionViewWillEnter(){
    console.log(this.getuserdata);
 
            if (localStorage.getItem("user") === null) 
            {
              Swal.fire({
                          'imageUrl' :'assets/icon/login.gif',
                          'imageHeight':'100px', 
                          'title': 'Please Login Again With New Password !',
                           heightAuto: false , 
                           timer: 3000
                          });
                          
              this.router.navigateByUrl('/login');
            }
          }

  updatepass(){

        console.log(this.form.value);  
        this.httpapi.updatePassformdata(this.form.value.o_pass,this.form.value.n_pass,this.form.value.r_n_pass).subscribe({
          next:(data) => {
            console.log(data);
           
          },
          error:() => {
            console.log('err');
            // this.loadingCtrl.dismiss();
             Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
          },
          complete:() => {
            localStorage.clear();
            Swal.fire({
            'imageUrl' :'assets/icon/success.gif',
            'imageHeight':'100px', 
            'title': 'Password updated successfully',
             heightAuto: false , 
             timer: 3000
               });
      this.router.navigateByUrl('/login')
          }
        })
  }

     // submit(){
    //   this.showLoading();
    //   console.log(this.form.value);  
    //   this.httpapi.complaintsformdata(this.form.value.name,this.form.value.location,this.form.value.designation,this.form.value.topic,this.form.value.remark).subscribe({
    //     next:(data) => {
    //       console.log(data);
         
    //     },
    //     error:() => {
    //       console.log('err');
    //       this.loadingCtrl.dismiss();
    //        Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
    //     },
    //     complete:() => {
    //     }
    //   })
    //  }
    openPage(url :any){
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
              this.updatepass();
            },
          },
        ],
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
    }

    getprofile(){
      this.httpapi.profiledata(this.getuserdata.id).subscribe({
            next:(data) => {
              console.log(data);
              this.userprofile = data[0];
              // console.log(this.userprofile)
             
            },
            error:() => {
              console.log('err');
        
               Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
            },
            complete:() => {
            }
          })
    }
}
