import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { ReplaceserviceService } from 'src/app/service/replace/replaceservice.service';

@Component({
  selector: 'app-replaceitems',
  templateUrl: './replaceitems.page.html',
  styleUrls: ['./replaceitems.page.scss'],
})
export class ReplaceitemsPage implements OnInit {
  isModalOpen=false;
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  response:any=[];
  test:any=[];
  test2:any=[];
  part_name:any=[];
  cour : any=[];
  c_p:any=[];
  chassis_no:any=[];
  docket:any=[];
  remarks:any=[];
  w_info:any=[];
  w:any=[];
  s_d:any=[];
  photo:any=[];

  constructor(
    private httpapi : ReplaceserviceService,
    private router :Router,
  ) { console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }
  }

  ngOnInit() {
    this.getdata();
  }
  ionViewDidLeave(){
    this.isModalOpen=false;
  }
  ionViewWillLeave(){
    this.isModalOpen=false;
  }

  getdata(){
    this.httpapi.getAllitems(this.getuserdata.id).subscribe({
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
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  open(id:any,model:any,partname:any,courier:any,courier_partner:any,chassis:any,docked:any,remark:any,warranty_info:any,warranty:any,sale_date:any,file:any){

    this.isModalOpen = true;
    this.test = id;
    this.test2 = model;
    this.part_name = partname;
    this.cour = courier;
    this.c_p = courier_partner;
    this.chassis_no = chassis;
    this.docket= docked;
    this.remarks= remark;
    this.w_info=warranty_info;
    this.w = warranty;
    this.s_d = sale_date;
    this.photo = file;

  }
}
