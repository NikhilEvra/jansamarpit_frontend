import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-closedcomplaint',
  templateUrl: './closedcomplaint.page.html',
  styleUrls: ['./closedcomplaint.page.scss'],
})
export class ClosedcomplaintPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];

  response:any=[];
  constructor(private api : FormService) {
    console.log(this.USTEMP);
      if (this.USTEMP) {
        this.getuserdata = JSON.parse(this.USTEMP) ;
      } 
   }

  ngOnInit() {
    this.complaint();
  }
  complaint(){
    this.api.getClosedComplaints(this.getuserdata.id).subscribe({
        next:(data) =>{
          console.log(data);
          this.response = data;
        },
        error:() =>{
          alert('error');
       
        },
        complete:() =>{
       
              
        }
      })
    }

}
