import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcomplaints',
  templateUrl: './addcomplaints.page.html',
  styleUrls: ['./addcomplaints.page.scss'],
})
export class AddcomplaintsPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  constructor() {
     console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    }  }

  ngOnInit() {
  }
  submit(){

      Swal.fire({
            'imageUrl' :'assets/icon/success.gif',
            'imageHeight':'100px', 
            'title': 'You have successfully filed a complaint',
             heightAuto: false , 
             timer: 3000
            });
  }


}
