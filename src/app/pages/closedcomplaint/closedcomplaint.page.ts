import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-closedcomplaint',
  templateUrl: './closedcomplaint.page.html',
  styleUrls: ['./closedcomplaint.page.scss'],
})
export class ClosedcomplaintPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];

  handlerMessage = '';
  roleMessage = '';

  response:any=[];
  constructor(private api : FormService,
    private alertController: AlertController,
    private router : Router) {
    console.log(this.USTEMP);
      if (this.USTEMP) {
        this.getuserdata = JSON.parse(this.USTEMP) ;
      } 
   }

  ngOnInit() {
    this.complaint();
  }
  complaint(){
    this.api.getClosedComplaints(this.getuserdata.id).subscribe({
        next:(data) =>{
          console.log(data);
          this.response = data;
        },
        error:() =>{
          alert('error');
       
        },
        complete:() =>{
       
              
        }
      })
    }

    reopen(id : any){
      // alert(id);
      this.api.updatecomplaintStatus(id).subscribe({
        next:(data) => {
          console.log(data);
          this.router.navigateByUrl('/dashboard');
         
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000}); 
        },
        error:() => {
          console.log('err');
           Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
          
        },
        complete:() => {
         
        }
      })
    }
    
    async presentAlert(id:any) {
      const alert = await this.alertController.create({
        header: 'Are You Sure ',
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
              this.reopen(id);
            },
          },
        ],
      });
    
      await alert.present();
    
      const { role } = await alert.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
    }
}
