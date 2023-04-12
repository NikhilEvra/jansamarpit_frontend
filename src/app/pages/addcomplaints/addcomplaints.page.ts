import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/service/form/form.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addcomplaints',
  templateUrl: './addcomplaints.page.html',
  styleUrls: ['./addcomplaints.page.scss'],
})
export class AddcomplaintsPage implements OnInit {
  form! : FormGroup;
  imagename:any=[];
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];

  response:any=[];

  constructor(private router : Router,
    private formb : FormBuilder,
    private httpapi : FormService,
    private loadingCtrl : LoadingController) {
          console.log(this.USTEMP);
          if (this.USTEMP) {
            this.getuserdata = JSON.parse(this.USTEMP) ;
          }  
  }

  Initform(){
    this.form = this.formb.group({    
      name: ['Nikhi', Validators.required],
      location: ['', Validators.required],
      designation: ['', Validators.required],  
      topic: ['', Validators.required],
      remark: ['', Validators.required],
      filename : ['']
    })
  }

  ngOnInit() {
    this.Initform();
  }
  
    submit(){
      this.showLoading();
      console.log(this.form.value);  
      this.httpapi.complaintsformdata(this.form.value.name,this.form.value.location,this.form.value.designation,this.form.value.topic,this.form.value.remark,this.form.value.filename).subscribe({
        next:(data) => {
          console.log(data);
          this.response = data;
         
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl('/opencomplaints');
         
        },
        error:() => {
          console.log('err');
         
           Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
           this.loadingCtrl.dismiss();
        },
        complete:() => {
          this.loadingCtrl.dismiss();
           Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': this.response.message,  heightAuto: false ,  timer: 3000});
        }
      })
     }

     async showLoading() {
      const loading = await this.loadingCtrl.create({
        // message: 'Dismissing after 3 seconds...',
        // duration: 3000,
      });
      loading.present();
    }
  
  opencam(){
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      
      var imageUrl = image.webPath;
      this.imagename = imageUrl;
     
      console.log(this.imagename);
    };
   
    takePicture();

  }


  uploadPhoto(fileChangeEvent : any) {
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];
    console.log(photo);
    // Create a form data object using the FormData API
    let formData = new FormData();
    // Add the file that was just added to the form data
    formData.append("photo", photo, photo.name);
    this.httpapi.uploadImg(formData).subscribe({ 
      next:(dat) => {
        console.log(dat);
      }
    })
  }



}
