import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { ActionSheetController, LoadingController, MenuController } from '@ionic/angular';
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
    url: 'assets/home_banner/banner1.jpg'
  },{
    url: 'assets/home_banner/evra.png'
  }]
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
      heading : 'Total / Left',
    },
  ]
  slideServiceReport = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay: false
  };
  
  service: any = [{
    title: 'Inventory',
    date: '13-12-22',
    status: '12',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'Sales',
    date: '13-12-22',
    status: '40',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'Complaints',
    date: '13-12-22',
    status: '10',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'Service',
    date: '13-12-22',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  }]

  todaySpecial:any =[{
    image: 'assets/homepage/special_thali.jpeg',
    name: 'Special Thali',
    rating: '4.0',
    avl: 20
  },{
    image: 'assets/homepage/special_thali.jpeg',
    name: 'Special Combo',
    rating: '3.0',
    avl: 20
  },{
    image: 'assets/homepage/special_thali.jpeg',
    name: 'Special Thali',
    rating: '4.0',
    avl: 20
  }]

  myfun = false;

  menu1:any=[];
  
  constructor(
    private router : Router,
    private actionSheetCtrl : ActionSheetController,
    private menuctrl : MenuController,
    private loadingCtrl : LoadingController,
    private api2 : LoginService,
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
  console.log(this.getuserdata);
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
    // App.exitApp();
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

}
