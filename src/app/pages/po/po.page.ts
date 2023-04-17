import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

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
    private route : ActivatedRoute,
    private api : FormService
  ) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }
  }

  Initform(){
    this.form = this.formb.group({    
     name: [this.getuserdata.id, Validators.required],
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
    console.log(this.getuserdata.id)
    this.Initform();
    // this.getValue= this.route.snapshot.paramMap.get("item")
    // console.log(JSON.parse(this.getValue));
    console.log(this.name);
  }

  submit(){
    // this.showLoading();
    this.api.postPodata(this.form.value.name,this.form.value.model_name ,this.form.value.unit_price, this.form.value.amount, this.form.value.quantity).subscribe({
      next:(data) => {
        console.log(data);
       
        if (data.status) {
           Swal.fire({'imageUrl' :'assets/icon/success.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000});
          // this.presentToast(data.message , 'success' );
          this.router.navigateByUrl('/poinvoice');
        } else if(data.status == false){
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000});
          // this.presentToast(data.message, 'danger');
        } 
      },
      error:() => {
        console.log('err');
         Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
        // this.presentToast('Internal server error' , 'warning' )
      },
      complete:() => {
        
      }
    })
    
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
