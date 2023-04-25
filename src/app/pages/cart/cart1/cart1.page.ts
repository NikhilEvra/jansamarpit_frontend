import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart1',
  templateUrl: './cart1.page.html',
  styleUrls: ['./cart1.page.scss'],
})
export class Cart1Page implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];

  form!: FormGroup
 model:any=[];
 model_name:any=[];
  constructor(
    private route : ActivatedRoute,
    private formb : FormBuilder
  ) { console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }}

  Initform(){
    this.form = this.formb.group({    
     name: [this.getuserdata.id, Validators.required],
     model : [this.model_name,Validators.required],
     color : ['',Validators.required]
    })

   
  }
  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      // this.orderby = params.orderby;
      // console.log(this.orderby); // price
      this.model = params;
     
      this.model_name = this.model.model;
    }
  );
  
  this.Initform();
  }

}
