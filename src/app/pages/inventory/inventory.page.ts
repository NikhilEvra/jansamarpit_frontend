import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  data:any=['test'];
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];
  
  response:any=[];

  constructor(
    private router: Router,
    private api : FormService
  ) {  console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } }

  ngOnInit() {
    this.inventory();
    
  }

  openPage(url: any){
    this.router.navigateByUrl(url);
  }

  inventory(){
    this.api.getInventory(this.getuserdata.id).subscribe({
        next:(data) =>{
          console.log(data[0]);
          this.response = data;
          console.log(this.response);
         
        
        },
        error:() =>{
          alert('error');
       
        },
        complete:() =>{
    
              
        }
      })
    }
}
