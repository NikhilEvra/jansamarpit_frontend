import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-opencomplaints',
  templateUrl: './opencomplaints.page.html',
  styleUrls: ['./opencomplaints.page.scss'],
})
export class OpencomplaintsPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];

  response:any=[];
  constructor(private api : FormService,
    private router : Router,
    
    ) {
      console.log(this.USTEMP);
      if (this.USTEMP) {
        this.getuserdata = JSON.parse(this.USTEMP) ;
      } 
     }

  ngOnInit() {
    this.complaint();
  }
   
  complaint(){
  this.api.getOpenComplaints(this.getuserdata.id).subscribe({
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

  land(id : any){
    // console.log(id);
    // this.router.navigate(['/viewcomplaint'], {queryParams : id});
    // this.router.navigate(['map'], {queryParams: this.station});
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id:id
      }
    };
    this.router.navigate(['/viewcomplaint'], navigationExtras);
  }

}
