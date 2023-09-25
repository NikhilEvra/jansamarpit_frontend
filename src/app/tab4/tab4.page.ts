import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormService } from '../service/form/form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  form!:FormGroup;
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];
  constructor(
    private httpapi : FormService,
    private formb :FormBuilder
  ) { 
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }  
  }

  ngOnInit() {
    this.initform();
    
  }

  initform(){
    this.form = this.formb.group({
      name:[this.getuserdata.name],
      remark:['',Validators.required],
    });
  }

  submit(){
    this.httpapi.submit_tech_error(this.form.value).subscribe({
      next:(data) => {
        console.log(data);
      },
      error:() => {
        console.log('err');
         Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'Internal Server Error!',
           heightAuto: false ,
           timer: 3000});
       
      },
      complete:() => {

         Swal.fire({
             'imageUrl' :'assets/icon/login.gif',
             'imageHeight':'100px', 
             'title': 'We have recieved your complaint',
              heightAuto: false , 
              timer: 3000
             });

             this.form.reset();
  
      }
    })
  }

}
