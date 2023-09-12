import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoginService } from '../service/login/login.service';
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
    icon: 'https://cdn-icons-png.flaticon.com/512/4726/4726268.png',
    name: 'Subscription',
  },
  {
    icon: 'https://gapio.in/wp-content/uploads/2022/05/1_4XRAX4obUOvMVqWibVCneQ.jpeg',
    name: 'Donation ',
  }
]
    constructor(
      private formb : FormBuilder,
      private api : LoginService
    ) {}
   
    initForm(){  
      this.form = this.formb.group({    
        file: ['', Validators.required],      
      })
    }
    ngOnInit() {
      this.initForm();
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


}
