import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/service/form/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewcomplaint',
  templateUrl: './viewcomplaint.page.html',
  styleUrls: ['./viewcomplaint.page.scss'],
})
export class ViewcomplaintPage implements OnInit {
idd:any=[];
mycomplaints:any=[];
  constructor(
    private route: ActivatedRoute,
    private api : FormService
  ) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      // this.orderby = params.orderby;
      // console.log(this.orderby); // price
      this.idd = params;
      console.log(this.idd.id);
    }
  );
  this.get_complaint();
  }

  get_complaint(){
      const dat = {'c_id' : this.idd.id};
      this.api.get_complaint_by_id(dat).subscribe({
      next:(data) =>{
      console.log(data); 
      this.mycomplaints = data[0];

      },

      error:() =>{
        Swal.fire({
        'imageUrl' :'assets/icon/login.gif',
        'imageHeight':'100px', 
        'title': 'Internal server error',
        heightAuto: false , 
        timer: 3000
        });
      },

      complete:() =>{


      }
      });
      }

}
