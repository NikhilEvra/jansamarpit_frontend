import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sparepart-catalog',
  templateUrl: './sparepart-catalog.page.html',
  styleUrls: ['./sparepart-catalog.page.scss'],
})
export class SparepartCatalogPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];
  model:any=[];
  model_name:any=[];

  s_id:any=[];
   isModalOpen = false;
   form!:FormGroup;

  spareparts:any=[];
  i_name:any=[];
  price:any=[];
  totalprice:any=[0];
  response:any=[];

  constructor(
    private api : CartService,
    private route : ActivatedRoute,
    private formb : FormBuilder
  ) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.model = params;
      this.model_name = this.model.model;
    }
  );
  this.sparepart();
  this.initform();

  }
  initform(){
    this.form = this.formb.group({
      quantity:['',Validators.required],
      model:[this.model_name],
      item_name:[this.i_name]
    });
  }


  sparepart(){
   
    this.api.get_spareparts(this.getuserdata.usertype,this.getuserdata.zone,this.model_name).subscribe({
        next:(data) =>{
          console.log(data);
          this.spareparts = data;
          
        },
        error:() =>{
          console.log('error');
       
        },
        complete:() =>{
   
        }
      })
    }

   
    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }
    getdata(item:any,i:any){
      this.i_name = item;
      this.price = this.spareparts[i].dealer_price;
      this.s_id = this.spareparts[i].id;

      this.form = this.formb.group({
        quantity:['',Validators.required],
        model:[this.model_name],
        item_name:[this.i_name],
        t_price:[this.totalprice],
      });

    }

    submit(){
      console.log(this.form.value);
      this.api.post_sparepart_cart(this.form.value,this.price,this.getuserdata.id,this.s_id).subscribe({
        next:(data) => {
          console.log(data);
          this.response = data;
        },
        error:() => {
          console.log('err');
           Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
        },
        complete:() => {
          this.form.reset();
          Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title':'Added To Cart',  heightAuto: false ,  timer: 3000});
          this.isModalOpen=false;
  
          // this.loadingCtrl.dismiss();
        }
      })
    }
    calculate(){
      // console.log(this.form.value.quantity * this.price);
      this.totalprice = this.form.value.quantity * this.price;
    }
}
