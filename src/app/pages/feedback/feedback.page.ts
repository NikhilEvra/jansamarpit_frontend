import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  constructor(private loadingCtrl : LoadingController,
    private router : Router) { }

  ngOnInit() {
  }
  ionViewDidLeave(){
    this.loadingCtrl.dismiss();
  }
 
   submit(){
    this.showLoading();
    this.router.navigateByUrl('/dashboard')

    Swal.fire({
      'imageUrl' :'assets/icon/success.gif',
      'imageHeight':'100px', 
      'title': 'You have submited your feedback',
       heightAuto: false , 
       timer: 3000
      });
   }

   

async showLoading() {
  const loading = await this.loadingCtrl.create({
    // message: 'Dismissing after 3 seconds...',
    // duration: 3000,
  });

  loading.present();
}
}
