import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-opencomplaints',
  templateUrl: './opencomplaints.page.html',
  styleUrls: ['./opencomplaints.page.scss'],
})
export class OpencomplaintsPage implements OnInit {
  response:any=[];
  constructor(private api : FormService,
    ) { }

  ngOnInit() {
    this.complaint();
  }
   
  complaint(){
  this.api.getOpenComplaints().subscribe({
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
