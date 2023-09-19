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
  constructor(
    private api : ComplaintService,
  ) { }

  ngOnInit() {
    this.complaints();
  }

  complaints(){
  this.api.get_complaints().subscribe({
    next:(data) =>{
      console.log(data); 
      this.mycomplaints = data;  
    },
    error:() =>{
      Swal.fire({
        'imageUrl' :'assets/icon/login.gif',
        'imageHeight':'100px', 
        'title': 'Invalid Phone Number',
         heightAuto: false , 
         timer: 3000
        });
    },
    complete:() =>{
    
     
     }
    });
  }

}
