import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.page.html',
  styleUrls: ['./repair.page.scss'],
})
export class RepairPage implements OnInit {
  form! : FormGroup;
  event : any=[];
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  handlerMessage = '';
  roleMessage = '';
  response:any=[];
  myfun = false;
  isModalOpen = false;

  constructor(private route : ActivatedRoute,
    private alertController: AlertController,
    private formb : FormBuilder,
    private httpapi : CartService,
    private modal : ModalController) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 
  }

  Initform(){
    this.form = this.formb.group({    
      name: [this.getuserdata.id, Validators.required],
      chassis:['',Validators.required],

    })
  }
  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      // console.log(params); 
     
      this.event = params;
      console.log(this.event.event);
    }
  );
  this.Initform();
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
   this.httpapi.getVehicleInfo(this.form.value.chassis).subscribe({
    next:(data)=>{
      console.log(data);
      this.response = data;
      this.myfun = true;
    },
    error:() =>{
      alert('error');
   
    },
    complete:() =>{

    }
   })
  }

  land(){
  
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
