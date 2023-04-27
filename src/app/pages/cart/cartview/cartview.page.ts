import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartview',
  templateUrl: './cartview.page.html',
  styleUrls: ['./cartview.page.scss'],
})
export class CartviewPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];
  response:any=[];
  totalamount : any=[];
  form! : FormGroup;
  g_total:any=[];
  constructor(private api : FormService,
    private api2 : CartService,
    private formb :FormBuilder,
    private router : Router) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP);
    }
  }

  ngOnInit() {
    this.total();
    this.cart();
    
   
    }

  Initform(){
    this.form = this.formb.group({    
      dealerid: [this.getuserdata.id, Validators.required],  
      amount:[this.g_total ,Validators.required],
    })
  }

  cart(){
    this.api.getAllCartData(this.getuserdata.id).subscribe({
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

    total(){
      this.api2.getGrandTotal(this.getuserdata.id).subscribe({
          next:(data) =>{
            console.log(data);
            this.totalamount = data;
           this.g_total =this.totalamount.grand_total;
           console.log(this.g_total);
           
          },
          error:() =>{
            alert('error');
         
          },
          complete:() =>{
            this.Initform();
            console.log(this.g_total);
          }
        })
      }

      submit(){
        this.api2.podata(this.form.value.dealerid ,this.form.value.amount).subscribe({
          next:(data) => {
            console.log(data);
            this.router.navigateByUrl('/inventory');
           
            Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': data.message,  heightAuto: false ,  timer: 3000}); 
          },
          error:() => {
            console.log('err');
           
             Swal.fire({'imageUrl' :'assets/icon/login.gif','imageHeight':'100px', 'title': 'Internal Server Error!',  heightAuto: false ,  timer: 3000});
            
           
          },
          complete:() => {
           
          }
        })
    
      }
}
