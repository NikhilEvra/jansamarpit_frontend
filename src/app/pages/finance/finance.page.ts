import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  response:any=[];
  constructor(private api : LoginService) { }

  ngOnInit() {
    this.finance_data();
  }
  finance_data(){
   
    this.api.get_finance_list().subscribe({
        next:(data) =>{
          console.log(data);
          this.response = data;
          
        },
        error:() =>{
          console.log('error');
       
        },
        complete:() =>{
   
        }
      })
    }
}
