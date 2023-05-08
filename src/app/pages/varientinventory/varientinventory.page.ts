import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-varientinventory',
  templateUrl: './varientinventory.page.html',
  styleUrls: ['./varientinventory.page.scss'],
})
export class VarientinventoryPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  model:any=[];
  response :any=[];
  constructor(
    private route : ActivatedRoute,
    private api : FormService
  ) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.model = params;
     
    }
  );

  this.getdata();
  }

  getdata(){
   
    this.api.getVarientscount(this.model.model, this.getuserdata.id).subscribe({
      next:(data) =>{
        console.log(data);
        this.response = data;
       
      },
      error:() =>{
        alert('error');
     
      },
      complete:() =>{
        // this.loadingCtrl.dismiss();
      }
    })
    
  }
}
