import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewcomplaint',
  templateUrl: './viewcomplaint.page.html',
  styleUrls: ['./viewcomplaint.page.scss'],
})
export class ViewcomplaintPage implements OnInit {
  idd:any=[];
  response:any=[];
  response2:any=[];
  

  constructor(private router : Router,
    private route: ActivatedRoute,
    private api : FormService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        // this.orderby = params.orderby;
        // console.log(this.orderby); // price
        this.idd = params;
        console.log(this.idd.id);
      }
    );
   
   this.complaint();
 
  
  }

  complaint(){
    this.api.getComplaintById(this.idd.id).subscribe({
        next:(data) =>{
          // console.log(data[0]);
          this.response = data;
          // console.log(this.response[0]);
          this.response2 = this.response[0];
          console.log(this.response2.filename)
        
        },
        error:() =>{
          alert('error');
       
        },
        complete:() =>{
   
        }
      })
    }

}
