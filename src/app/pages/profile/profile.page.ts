import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];

  constructor(private router : Router,
    ) {  
       console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log(this.getuserdata);
 
            if (localStorage.getItem("user") === null) 
            {
              Swal.fire({
                          'imageUrl' :'assets/icon/login.gif',
                          'imageHeight':'100px', 
                          'title': 'Please Login Again With New Password !',
                           heightAuto: false , 
                           timer: 3000
                          });
                          
              this.router.navigateByUrl('/login');
            }
          }

  updatepass(){
    localStorage.clear();
            Swal.fire({
            'imageUrl' :'assets/icon/success.gif',
            'imageHeight':'100px', 
            'title': 'Password updated successfully',
             heightAuto: false , 
             timer: 3000
               });
      this.router.navigateByUrl('/login')
  }
}
