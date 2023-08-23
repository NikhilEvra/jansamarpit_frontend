import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.page.html',
  styleUrls: ['./insurance.page.scss'],
})
export class InsurancePage implements OnInit {
response:any=[];
  constructor(private api : LoginService) { }

  ngOnInit() {
    this.insurance_data();
  }
insurance_data(){
   
    this.api.get_insurance_list().subscribe({
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
