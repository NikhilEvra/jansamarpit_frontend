import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-po',
  templateUrl: './po.page.html',
  styleUrls: ['./po.page.scss'],
})
export class PoPage implements OnInit {
  form! : FormGroup;
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];

  getValue:any=[];

  modelName:any=[{
    model: 'scooty',
    price : '20000',
  },{
    model : 'bike',
    price : '25000',
  }];
  myfun =  false;
  chassis:any=[];
  name: any;
  status1! : any;
  dataView: any = [];
  status2! : any;
  dataView2:any=[];

  constructor(
    private formb : FormBuilder,
    private router : Router,
    private route : ActivatedRoute
  ) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }
  }

  Initform(){
    this.form = this.formb.group({    
      // name: [this.getuserdata.name, Validators.required],
      // b_name: ['',Validators.required],
      // b_mobile:['',Validators.required],
      // location: ['', Validators.required],
      model_name: ['', Validators.required],  
      unit_price: [this.dataView, Validators.required],
      amount: [this.dataView2, Validators.required],
      // email : ['', Validators.required],
      // po : ['',Validators.required],
      quantity: ['',Validators.required]
    })
  }


  ngOnInit() {
    this.Initform();
    // this.getValue= this.route.snapshot.paramMap.get("item")
    // console.log(JSON.parse(this.getValue));
    console.log(this.name)

  }

  submit(){
  }

  changeFun() {
    this.dataView2 = null;
    this.status2 = null;
    if (this.status1 == 'scooty') {
      this.dataView ='100000';
      
    } else if (this.status1 == 'bike') {
      this.dataView = '200000';
    } 
    this.myfun = true;
  }

  changeFun2(){
    if(this.status1 == null){
      alert('Select Model');
      this.status2 = null;
      return;
     }
    console.log(this.status2);
   this.dataView2 = this.status2 * this.dataView;
   console.log(this.dataView2)
   

  }
}
