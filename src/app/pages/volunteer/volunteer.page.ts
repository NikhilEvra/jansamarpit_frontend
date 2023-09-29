import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.page.html',
  styleUrls: ['./volunteer.page.scss'],
})
export class VolunteerPage implements OnInit {
  volunteers:any=[{
    name:'Nikhil',
    img:'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
  },{
    name:'Nikhil',
    img:'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
  },{
    name:'Nikhil',
    img:'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
  },{
    name:'Nikhil',
    img:'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
  },{
    name:'Nikhil',
    img:'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
  }];

  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];


  volunteerdata:any=[];
  constructor(
    private api : FormService,
    private router : Router
  ) { 
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }
  }

  ngOnInit() {
    this.getvolunteers();
  }

  getvolunteers(){
    const data  =  {"state":'Haryana',
    "city":'Faridabad'};
    this.api.get_volunteers(data).subscribe({
      next:(data) =>{
        console.log(data); 
        this.volunteerdata = data;  
      },
      error:() =>{
        Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'Internal Server Error',
           heightAuto: false , 
           timer: 3000
          });
      },
      complete:() =>{
      
       
       }
      });

  }

  select(name:any){
  
    const data  =  {"volunteer":name,"u_id":this.getuserdata.u_id};
    this.api.post_volunteer(data).subscribe({
      next:(data) =>{
        console.log(data); 
       
      },
      error:() =>{
        Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'Internal server Error',
           heightAuto: false , 
           timer: 3000
          });
      },
      complete:() =>{
      
       this.router.navigateByUrl('/app/tabs/tab1')
       }
      });

  }

}
