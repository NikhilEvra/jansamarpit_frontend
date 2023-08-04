import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart/cart.service';
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
  model_name:any=[];
  form1 :any=['form1'];
  status3= 0;
  status4!:any;
  status5=0;
  status6=0;
  status7=0;
  status8=0;
  status9=0;
  status10=0;
  status11=0;
  status12=0;
  
  models:any=[];
  dataView3!:any;
  
  constructor(
    private formb : FormBuilder,
    private router : Router,
    private route : ActivatedRoute,
    private api : FormService,
    private modal : ModalController,
    private httpapi : CartService
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
    console.log(this.getuserdata.id);
    this.Initform();
    // this.getValue= this.route.snapshot.paramMap.get("item")
    // console.log(JSON.parse(this.getValue));
    this.model();
   
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

  updatevalue(dat :any){
    this.model_name = dat;
    if(this.model_name == 'HELTER'){
      Swal.fire({ 'title': 'Out Of Stock!',  heightAuto: false ,  timer: 3000});

    }
   else if(this.model_name == 'LUSTER'){
    Swal.fire({ 'title': 'Out Of Stock!',   heightAuto: false ,  timer: 3000});

    }
    else{
        // console.log(this.model_name);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            model : dat
          }
        };
        this.router.navigate(['/cart1'], navigationExtras);
    }
  
  }

changefun3(dat : any){
 console.log(dat)
  if (dat == 'Scooty') {
    this.dataView ='100000';
    console.log(this.dataView);
    
  } 
  else if (dat == 'Bike') {
    this.dataView = '200000';
    console.log(this.dataView);
  } 
}

model(){
  this.api.getAllProduct().subscribe({
    next:(data) =>{
      console.log(data);
      this.models = data;
     
     
    },
    error:() =>{
      alert('error');
   
    },
    complete:() =>{
 
    }
  })
 
}



  

}
