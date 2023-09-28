import { Component } from '@angular/core';
import { AttendanceService } from '../service/attendance/attendance.service';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Country, State, City }  from 'country-state-city';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // title : any;
  // series : any=[];
  // chart : any;
  att:any=['2023-03-21','2023-03-22'];
  attendance:any=[];
  att1:any=[];
  comment: any = [{
    name: 'Total Atendance ',
    status: 'Present Days',
    date: '100',
    bg: '#B0CCBB',
  },{
    name: 'Total',
    status: 'days class taken',
    date: '90',
    bg: '#EFFCFA',
  }];
  dayvalue:any=['21','22'];
  form! :FormGroup;
  im2 = false;
 
  USTEMP = localStorage.getItem('user');

  getuserdata: any=[];
  imageSource:any=[];
  country:any=[];
  states:any=[];
  cities:any=[];
  co:any=[];
  st:any=[];
  ci:any=[];
  ci2:any=[];
  st2:any=[];

  myfun = false;

  constructor(
    private api : AttendanceService,
    private formb  : FormBuilder,
    private router : Router
  ) {
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 
  }

  ngOnInit() {
this.initform();

this.country = Country.getAllCountries();
// console.log(this.country);
this.co = this.country.name;

this.states = State.getAllStates();
// console.log(this.states);
// var s = this.country;
// const result = this.country.filter((s: { isoCode: string | string[]; }) => s.isoCode.includes('IN'));

  this.st = this.states.filter((s: {
  countryCode: any; isoCode: string | string[]; 
  }) => s.countryCode.includes('IN'));

  console.log(this.st);


  this.cities = City.getAllCities();

  this.ci = this.cities.filter((s: {
  countryCode: any; isoCode: string | string[]; 
  }) => s.countryCode.includes('IN'));
  }

  initform(){
    this.form = this.formb.group({
      name:[this.getuserdata.name],
      priority:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      remarks:['',Validators.required],
      file:[this.imageSource],
      user_id:[this.getuserdata.u_id],
      topic:['',Validators.required]
    })
  }
  getattendance(){
     
  this.api.getattendancedata().subscribe({
    next:(data) =>{
      // console.log(data);
      this.attendance = data;
      // console.log(this.attendance[0].adate);
      this.attendance.forEach((element: any) => {
        //  console.log(element);
        // console.log(element.attendance);
        this.att1.push(element.adate);
      });
      console.log(this.att1);
    
      // this.response2 = data;
    },
    error:() =>{
      // alert('error occured');
      // this.presentToast('Internal Server Error.' , 'Danger');
    },
    complete:() =>{

        
    }
  })

  }

  // chart1() : void{
  //   this.title = {
  //     text : 'Attendence',
  //   };
  //   this.series =[{
  //     name : 'Present',
  //     data : [10,20,12,11,10,23]
  //   }];
  //   this.chart = {
  //     type : 'bar'
  //   };

  // }

  submit(){    
  console.log(this.form.value);
  this.api.add_complaints(this.form.value).subscribe({
    next:(data) =>{
      console.log(data)
     
    },
    error:() =>{
    
    },
    complete:() =>{
      this.form.reset();

      this.router.navigateByUrl('/app/tabs/tab1');
      Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'You Have Successfully Raised A Complaint',
           heightAuto: false , 
           timer: 3000
          });

        
    }
  })

  }
  opencam(){
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        // saveToGallery:true 
      });
      // this.form.get('filename')?.setValue(image);
     
      this.imageSource =  'data:image/jpeg;base64,' + image.base64String;
      console.log(this.imageSource);
      if(this.imageSource !) {
        this.im2 = true;
     }
    };
    takePicture();
  }

  getcity(){
    this.st2 = this.st.filter((s: {
      name: any; isoCode: string | string[]; 
      }) => s.name.includes(this.form.value.state));
  
      console.log(this.st2[0].isoCode);
  
    this.ci2 = this.ci.filter((s: {
      stateCode: any; isoCode: string | string[]; 
      }) => s.stateCode.includes(this.st2[0].isoCode));
      console.log(this.ci2);
  
      this.myfun = true;
    
  }
}
