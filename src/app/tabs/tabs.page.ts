import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  imageSource:any=[];
  binaryData:any=[];

  form! :FormGroup;
dat:any=[];
isModalOpen = false;
quickLink: any = [

  {
    icon: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
    name: 'Profile',
  }
]
    constructor(
      private formb : FormBuilder,
      private api : LoginService,
      private router : Router
    ) {}
   
    initForm(){  
      this.form = this.formb.group({    
        file: ['', Validators.required],      
      })
    }
    ngOnInit() {
      this.initForm();
    }
    ionViewDidLeave(){
      console.log('leave')
    }
    
  opencam(){
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        // saveToGallery:true 
      });
     
      this.imageSource =  'data:image/jpeg;base64,' + image.base64String;
      // console.log(this.imageSource);

      this.form.get('file')?.setValue(this.imageSource);
      // console.log(this.form.value.file)
     this.dat=  JSON.stringify(this.form.value);   
       console.log(this.dat);
       this.otp()
    };
    takePicture();


  }
  otp(){
    this.api.send_file(this.dat).subscribe({
      next:(data:any) =>{
        console.log(data);
       
    
      },
      error:() =>{
       
      
      },
      complete:() =>{
       
     
       
      }
    })
  
  }
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  redirect(){
    // console.log('yes')
    this.router.navigateByUrl('/volunteer');

    this.isModalOpen = false;
    // console.log(this.isModalOpen)
    // if(this.isModalOpen = false){
    //   alert('y')
    // this.router.navigateByUrl('/volunteer');

    // }

  }

}
