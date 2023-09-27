import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/service/complaints/complaint.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mycomplaints',
  templateUrl: './mycomplaints.page.html',
  styleUrls: ['./mycomplaints.page.scss'],
})
export class MycomplaintsPage implements OnInit {
mycomplaints:any=[];
USTEMP = localStorage.getItem('user');
getuserdata: any=[];

  constructor(
    private api : ComplaintService,
  ) {  if (this.USTEMP) {
    this.getuserdata = JSON.parse(this.USTEMP) ;
  } }

  ngOnInit() {
    this.complaints();
  }

  complaints(){

    const dat = {'u_id' : this.getuserdata.u_id};
  this.api.get_complaints(dat).subscribe({
    next:(data) =>{
      console.log(data); 
      this.mycomplaints = data;  
    },
    error:() =>{
      Swal.fire({
        'imageUrl' :'assets/icon/login.gif',
        'imageHeight':'100px', 
        'title': 'Internal server error',
         heightAuto: false , 
         timer: 3000
        });
    },
    complete:() =>{
    
     
     }
    });
  }

}
