import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormService } from 'src/app/service/form/form.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {
  USTEMP = localStorage.getItem('user');
  getuserdata: any=[];

  response:any=[];

  constructor(private router : Router,
    private loadingCtrl : LoadingController,
    private api : FormService) { 
      console.log(this.USTEMP);
      if (this.USTEMP) {
        this.getuserdata = JSON.parse(this.USTEMP) ;
      } 
    }

  ngOnInit() {
    this.complaint();
  }
  openPage(url : any){
    this.showLoading();
    this.router.navigateByUrl(url);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading please Wait...',
      duration: 3000,
    });

    loading.present();
  }

  complaint(){
    this.api.getComplaints(this.getuserdata.id).subscribe({
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

}
