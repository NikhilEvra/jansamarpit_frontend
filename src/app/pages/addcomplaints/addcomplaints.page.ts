import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcomplaints',
  templateUrl: './addcomplaints.page.html',
  styleUrls: ['./addcomplaints.page.scss'],
})
export class AddcomplaintsPage implements OnInit {
  imagename:any=[];
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  constructor(private router : Router,) {
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
            this.router.navigateByUrl('/complaints');
  }

  opencam(){
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      var imageUrl = image.webPath;

      this.imagename = imageUrl;
      console.log(this.imagename);
    };
    
    takePicture();
  }


}
