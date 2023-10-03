import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';
import { FormService } from '../service/form/form.service';
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

USTEMP = localStorage.getItem('user');
getuserdata: any=[];

complaintcount:any=[];
techerror_count:any=[];

quickLink: any = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    name: 'Profile',
  }
];

volunteer:any=[];
myfun = false;
myfun2 = true;
myvolunteer:any=[];

async canDismiss(data?: any, role?: string) {
  return role !== 'gesture';
}
    constructor(
      private formb : FormBuilder,
      private api : LoginService,
      private router : Router,
      private api2 : FormService
    ) {
      if (this.USTEMP) {
        this.getuserdata = JSON.parse(this.USTEMP) ;
      }
    }
   
    initForm(){  
      this.form = this.formb.group({    
        file: ['', Validators.required],      
      });
    }

    ngOnInit() {
      this.initForm();
      this.get_volunteer_by_id();
      this.dashdata();
      this.dashdata2();

   
    }

    ionViewDidLeave(){
      console.log('leave');
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
  
    this.router.navigateByUrl('/volunteer');
    // console.log(this.isModalOpen)
    // if(this.isModalOpen = false){
    //   alert('y')
    // this.router.navigateByUrl('/volunteer');

    // }

  }

  get_volunteer_by_id(){
    const dat = {"u_id":this.getuserdata.u_id}
    this.api2.get_volunteer_by_id(dat).subscribe({
      next:(data:any) =>{
        console.log(data);
       
        this.volunteer =  data;
        // alert(this.volunteer[0].volunteer)
      },
      error:() =>{
       
      
      },
      complete:() =>{
    
        if(!this.volunteer[0].volunteer){ 
          this.myfun = true;
          this.myfun2 = false;
        }
       
        this.get_volunteer_by_v_id();
      }
    })
  
  }

  dashdata(){
    const uid = {"u_id":this.getuserdata.u_id};
    this.api.get_dash_data(uid).subscribe({
      next:(data:any) =>{
        console.log(data);
        this.complaintcount = data.message[0].count;
        
      
      },
      error:() =>{
             
      },
      complete:() =>{
       
      }
    })
  
  }

  
  dashdata2(){
    const uid = {"u_id":this.getuserdata.u_id};
    this.api.get_dash_data2(uid).subscribe({
      next:(data:any) =>{
        console.log(data);
        this.techerror_count = data.message[0].count;
        
      
      },
      error:() =>{
             
      },
      complete:() =>{
       
      }
    })
  
  }

  get_volunteer_by_v_id(){
    const dat1 = {"v_id":this.volunteer[0].volunteer};
    this.api2.get_volunteer_by_v_id(dat1).subscribe({
      next:(data:any) =>{
        console.log(data);

        this.myvolunteer =  data[0];
        // alert(this.volunteer[0].volunteer)
      },
      error:() =>{
       
      
      },
      complete:() =>{
         


      }
    })
  
  }
  
}
