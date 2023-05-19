import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.page.html',
  styleUrls: ['./repair.page.scss'],
})
export class RepairPage implements OnInit {
  form! : FormGroup;
  form2! :FormGroup;
  event : any=[];
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  handlerMessage = '';
  roleMessage = '';
  response:any=[];
  myfun = false;
  isModalOpen = false;
  response2:any=[];


  constructor(private route : ActivatedRoute,
    private alertController: AlertController,
    private formb : FormBuilder,
    private httpapi : CartService,
    private modal : ModalController,
    private formb2 : FormBuilder,
    private router : Router,
    private loadingCtrl : LoadingController) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 
  }

  Initform(){
    this.form = this.formb.group({    
      name: [this.getuserdata.id, Validators.required],
      chassis:['',Validators.required],
      sparepart : [this.event.event,Validators.required],
      

    })

   
  }
  Initform2(){
    this.form2 = this.formb2.group({
      name: [this.getuserdata.id,Validators.required],
      part_no :[this.response.sparepart,Validators.required],
      warranty_info:[this.response.in_w,Validators.required],
      file: ['',Validators.required],
      remark:['',Validators.required]
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
// this.Initform2();


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
            this.sendSparePart();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  submit(){
    this.showLoading();
   this.httpapi.getVehicleInfo(this.form.value.chassis,this.form.value.sparepart).subscribe({
    next:(data)=>{
      console.log(data);
      this.response = data;
      this.myfun = true;
    },
    error:() =>{
      alert('error');
   
    },
    complete:() =>{
      this.Initform2();
    }
   })
  }

  uploadPhoto(fileChangeEvent : any) {
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];
    console.log(photo);
    this.form2.get('file')?.setValue(photo);
 
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  sendSparePart(){
    console.log(this.form2.value)
    this.httpapi.postsparePart(this.form2.value.name,this.form2.value.part_no,this.form2.value.warranty_info,this.form2.value.file,this.form2.value.remark,this.form.value.chassis,this.response.model_name,
    this.response.color,this.response.c_name,this.response.sale_date,this.response.warranty,this.event.event).subscribe({
    next:(data)=>{
      console.log(data);
      this.response2 = data;
      Swal.fire({
        'imageUrl' :'assets/icon/login.gif',
        'imageHeight':'100px', 
        'title': this.response2.message,
         heightAuto: false , 
         timer: 3000
        });
        this.isModalOpen = false;
       
    },
    error:() =>{
      alert('error');
   
    },
    complete:() =>{

    }
   })
  }
 
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading please Wait...',
      duration: 3000,
    });

    loading.present();
  }
}
