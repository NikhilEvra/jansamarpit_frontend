import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-viewpobyid',
  templateUrl: './viewpobyid.page.html',
  styleUrls: ['./viewpobyid.page.scss'],
})
export class ViewpobyidPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];
  form!:FormGroup;
  poid:any=[];
  response:any=[];

  hide=false;

  show=false;
  constructor(private route : ActivatedRoute,
    private formb : FormBuilder,
    private api : CartService,
    private api2 : FormService) { 
      console.log(this.USTEMP);
      if (this.USTEMP) {
        this.getuserdata = JSON.parse(this.USTEMP);
      }
    }

    Initform(){
      this.form = this.formb.group({
        remarks:['',Validators.required],
        dealerid:[this.getuserdata.id,Validators.required],
        trans_detail:['',Validators.required]
      })
    }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.poid = params;
     
    }
  );
  if(this.poid.status == 'Dealer' && this.poid.p_status != 'Po Disapproved'){
    this.hide = true;
  }
  this.Initform();
  this.get_po();
  }

  get_po(){
    this.api.get_po_by_id(this.poid.id).subscribe({
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
    openPage(url:any){

    }

    submit(){
      // console.log(this.form.value);
      this.api2.send_pay(this.form.value.dealerid,this.form.value.remarks,this.form.value.trans_detail,this.poid.id).subscribe({
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
