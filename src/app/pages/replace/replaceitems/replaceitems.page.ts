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
  test:any=[]
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

  open(id:any){
    this.isModalOpen = true;
    this.test = id;
  }
}
