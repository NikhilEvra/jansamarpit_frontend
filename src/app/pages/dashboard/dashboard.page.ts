import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { ActionSheetController, MenuController } from '@ionic/angular';

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
    url: 'assets/home_banner/banner-6.jpg'
  },{
    url: 'assets/home_banner/evra.png'
  }]
  quickLink: any = [
    {
      icon: 'assets/icon/stocks.avif',
      name: 'Inventory',
      url: '/inventory',
    },
    {
      icon: 'assets/icon/sale.jpg',
      name: 'Sales',
      url: '/sales',
    },
    {
      icon: 'assets/icon/complaints.avif',
      name: 'Complaints',
      url: '/complaints',
    },
    {
      icon: 'assets/icon/services.avif',
      name: 'Services',
      url : '/services',
    },
  ]
  slideServiceReport = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay: false
  };
  slideTodaySpl = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: false
  }
  slideAchivement = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false
  }
  slideLatestCampus = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  }
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

  latestCampus: any = [{
    image: 'assets/homepage/latest_campus.jpeg',
    title: 'Book Fair23',
    remark: '1000+ author collection'
  },{
    image: 'assets/homepage/latest_campus.jpeg',
    title: 'Science Ex',
    remark: '1000+ author collection'
  },{
    image: 'assets/homepage/latest_campus.jpeg',
    title: 'Holi Celebration',
    remark: 'Campus Celebration'
  },{
    image: 'assets/homepage/latest_campus.jpeg',
    title: 'Book Fair23',
    remark: '1000+ author collection'
  }]

  post: any = [{
    date: '12 Jan 2023',
    title: 'Notice Title',
    desc: 'This is show description here',
    bg: 'var(--ion-color-success)',
    color: 'success',
    br: '2px solid var(--ion-color-success)'
  },{
    date: '12 Jan 2023',
    title: 'Notice Title',
    desc: 'This is show description here',
    bg: 'var(--ion-color-primary)',
    color: 'primary',
  },{
    date: '12 Jan 2023',
    title: 'Notice Title',
    desc: 'This is show description here',
    bg: 'var(--ion-color-danger)',
    color: 'danger'
  },{
    date: '12 Jan 2023',
    title: 'Notice Title',
    desc: 'This is show description here',
    bg: 'var(--ion-color-warning)',
    color: 'warning',
  }]
  achivemnt: any = [{
    title: 'Student of the Year',
    date: '12-01-2021',
    name: 'Aman tyagi',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  },{
    title: 'Student of the Year',
    date: '12-01-2021',
    name: 'Aman tyagi',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  },{
    title: 'Student of the Year',
    date: '12-01-2021',
    name: 'Aman tyagi',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  }]


  constructor(
   
    private router : Router,
    private actionSheetCtrl : ActionSheetController,
    private menuctrl : MenuController,
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
  this.menuctrl.enable(true);
 }
  ngOnInit() {
    
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
    this.router.navigateByUrl(url);
  }

  land(url : any){
    this.router.navigateByUrl(url);
  }

  logout(){
    App.exitApp();
  }
}
