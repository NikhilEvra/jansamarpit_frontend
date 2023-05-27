import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ReplaceserviceService } from 'src/app/service/replace/replaceservice.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata:any=[];
  response:any=[];
  constructor(
    private router : Router,
    private httpapi : ReplaceserviceService,
    private loadingCtrl :LoadingController
  ) {console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } }

  ngOnInit() {
    this.getcount();
  }

  openpage(event : any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        event:event
      }
    };

    this.router.navigate(['/repair'], navigationExtras);
  //  this.router.navigateByUrl('/repair');
  }
  goto(url:any){
    this.showLoading();
    this.router.navigateByUrl(url)
  }

  getcount(){
    this.httpapi.getcount_request(this.getuserdata.id).subscribe({
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading please Wait...',
      duration: 3000,
    });

    loading.present();
  }

}
