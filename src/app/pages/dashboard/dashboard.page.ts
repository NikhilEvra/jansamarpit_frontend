import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { ActionSheetController, LoadingController, MenuController, PopoverController } from '@ionic/angular';
import { AnyARecord } from 'dns';
import { FormService } from 'src/app/service/form/form.service';
import { LoginService } from 'src/app/service/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  result: any;
  public progress = 0.7;
  USTEMP = localStorage.getItem('user');

  getuserdata: any=[];

  bsubject : any=[];
  isModalOpen = false;
  result1: any = [];

  homeBanner: any = [{
    url: 'https://evramedia.com/apifolder/catalog/ex1_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/ex2_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/ex2plus_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/ex3_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/mine_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/ex3plus_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/luster_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/helter_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/sparkle_banner.png'
  },{
    url: 'https://evramedia.com/apifolder/catalog/sparkledb_banner.png'
  }]
  footerBanner: any = []
  quickLink: any = [
    {
      icon: 'assets/icon/stocks.avif',
      name: 'Inventory',
      url: '/inventory',
      heading : 'Total / Left',
    },
    {
      icon: 'assets/icon/sale.jpg',
      name: 'Sales',
      url: '/sales',
      heading : 'Total / This month',
    },
    {
      icon: 'assets/icon/complaints.avif',
      name: 'Complaints',
      url: '/complaints',
      heading : 'Open / Closed',
    },
    {
      icon: 'assets/icon/services.avif',
      name: 'Services',
      url : '/services',
      heading : 'Total ',
    },
  ]
  slideServiceReport = {
    initialSlide: 0,
    // slidesPerView: 1.1,
    autoplay: true
  }; 
  
 

  myfun = false;

  menu1:any=[];
  response:any=[];
  response2:any=[];
  response3:any=[];
  response4:any=[];
  response5:any=[];

  constructor(
    private router : Router,
    private actionSheetCtrl : ActionSheetController,
    private menuctrl : MenuController,
    private loadingCtrl : LoadingController,
    private api2 : LoginService,
    private api : FormService,
    private popovercontroller : PopoverController,
  ) { 
    console.log(this.USTEMP);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

 ionViewWillEnter(){
  // console.log(this.getuserdata);
  this.menuctrl.enable(true);
          if (localStorage.getItem("user") === null) 
          {
            Swal.fire({
                        'imageUrl' :'assets/icon/login.gif',
                        'imageHeight':'100px', 
                        'title': 'Please Login Again !',
                         heightAuto: false , 
                         timer: 3000
                        });
                        
            this.router.navigateByUrl('/login');
          }

          // if(this.menu1 === null)
          // {
          //   this.router.navigateByUrl('/login');
          //   console.log("null behaviour");
          // }else{
          //   console.log("yes");
          // }
 }

  ngOnInit() {
    this.showLoading();
    this.dashData();
  }

  menu(): void{
    this.api2.menu.subscribe(res => {
      console.log(res);
      this.menu1 = res;
      console.log(this.menu1);
    });
  }
 
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }

  openPage(url : any){
    this.showLoading();
    this.router.navigateByUrl(url);
  }

  land(url : any){
    this.showLoading();
    this.router.navigateByUrl(url);
  }

  logout(){
    App.exitApp();
    localStorage.clear();
    this.api2.menu.unsubscribe();
    this.router.navigateByUrl('/login');
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading please Wait...',
      duration: 3000,
    });

    loading.present();
  }

  hide(){
    this.myfun = !this.myfun;
  }

  dashData(){
   
    this.api.getdashdata(this.getuserdata.id).subscribe({
        next:(data) =>{
          console.log(data);
          this.response =  data[0];
          this.response2 = data[1];
          this.response3 = data[2];
          this.response4 = data[3];
          this.response5 = data[4];
          console.log(this.response);
          console.log(this.response2);
          console.log(this.response3);
          console.log(this.response4);
          
        },
        error:() =>{
          console.log('error');
       
        },
        complete:() =>{
   
        }
      })
    }

    handleRefresh(event : any) {
      setTimeout(() => {
        // Any calls to load data go here
        this.dashData();
        event.target.complete();
      }, 2000);
    }

    
redirect(url:any){
  
  this.popovercontroller.dismiss();
  this.router.navigateByUrl(url);
}
   
}
