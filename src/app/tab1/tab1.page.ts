import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions  } from '@awesome-cordova-plugins/media-capture/ngx';
import { App } from '@capacitor/app';
import {Platform, PopoverController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild("header") header: HTMLElement | any;
  homeBanner: any = [{
    url: 'assets/home_banner/1.png'
  
    },{
    url: 'assets/home_banner/2.png'
  }];

  quickLink: any = [
    {
      icon: 'assets/icon/1.png',
      name: 'Complaints',
      url: '/mycomplaints'
    },
    {
      icon: 'assets/icon/2.png',
      name: 'Polls',
      url: ''
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/4726/4726268.png',
      name: 'Subscription',
    },
    {
      icon: 'https://gapio.in/wp-content/uploads/2022/05/1_4XRAX4obUOvMVqWibVCneQ.jpeg',
      name: 'Donation ',
    }
  ];
  
  slideServiceReport = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay: true
  };
  slideTodaySpl = {
    initialSlide: 0,
    slidesPerView: 1.8,
    autoplay: false
  }
  slideAchivement = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay: false
  }
  slideLatestCampus = {
    initialSlide: 0,
    slidesPerView: 2.8,
    autoplay: false
  };
  
  service: any = [{
    title: 'Problem One',
    date: '13 August,23',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'Problem Two',
    date: '13 August,23',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'Problem three',
    date: '13 August,23',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'Problem 4',
    date: '13 August,23',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  }]

  todaySpecial:any =[{
    image: 'assets/homepage/special_thali.jpeg',
    name: 'Deepak',
    rating: '4.0',
    avl: 20
  },{
    image: 'assets/homepage/special_thali.jpeg',
    name: 'Nikhil',
    rating: '3.0',
    avl: 20
  },{
    image: 'assets/homepage/special_thali.jpeg',
    name: 'Punnet',
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
    title: 'Donation',
    desc: 'I have donated 10000',
    bg: 'var(--ion-color-success)',
    color: 'success',
    br: '2px solid var(--ion-color-success)'
  },{
    date: '13 Jan 2023',
    title: 'Notice Title',
    desc: 'I have donated 100',
    bg: 'var(--ion-color-primary)',
    color: 'primary',
  },{
    date: '14 Jan 2023',
    title: 'Notice Title',
    desc: 'I have donated 200',
    bg: 'var(--ion-color-danger)',
    color: 'danger'
  },{
    date: '15 Jan 2023',
    title: 'Subscription',
    desc: 'This is show description here',
    bg: 'var(--ion-color-warning)',
    color: 'warning',
  }]

  
  achivemnt: any = [{
    title: 'MLA',
    date: '12-01-2021',
    name: 'Nikhil Chaudhary',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  },{
    title: 'MP',
    date: '12-01-2021',
    name: 'Nikhil Chaudhary',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  },{
    title: 'PARSHAD',
    date: '12-01-2021',
    name: 'Nikhil Chaudhary',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  }];


  birthday: any = [{
    date: '10-11',
    img: '',
    name: 'Nikhil Chaudhary'
  },{
    date: '10-11',
    img: '',
    name: 'Nikhil Chaudhary'
  },{
    date: '10-11',
    img: '',
    name: 'Nikhil Chaudhary'
  },{
    date: '10-11',
    img: '',
    name: 'deepak'
  }]

  dataView:any=[];

  USTEMP = localStorage.getItem('user');

  getuserdata: any=[];
  addlanguageList=[
    {code:"en",title:"english",text:"english"},
    {code:"hi",title:"hindi",text:"हिंदी"},

  ];

 
  img1:any=['https://hist1.latestly.com/wp-content/uploads/2022/09/PM-Modi1.jpg'];

  constructor(
    private router: Router,
    // private mediaCapture: MediaCapture,
    private translate : TranslateService,
    private popovercontroller : PopoverController,
    // private camera: Camera,
    public platform: Platform,
    public element: ElementRef, 
    public renderer: Renderer2
    
  ) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en','hi']);
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 



  }

  ngOnInit(){
    this.birthday.forEach(function (value:any) {
    // console.log(value);
          if(value.name == 'deepak'){
            console.log('yes');
            return; 
          }
      });

  }

  openPage(url: any) {
    this.router.navigateByUrl(url);
  }

  land(){
    this.router.navigateByUrl('/food');
  }
 
  filterItems(event: any) {
    this.dataView = this.quickLink;
    const val = event.target.value;
    if (val && val.trim() != '') { 
      this.dataView = this.dataView.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  
  logout(){
    App.exitApp();
    localStorage.clear();
    this.router.navigateByUrl('/login1');
  }

  OnlanguageChange(event:any){
    this.translate.use(event.target.value ?  event.target.value : "en");
  // this.popovercontroller.dismiss();

    }
    redirect(){
      // console.log('yes')
    
  
    
      this.router.navigateByUrl('/volunteer');
      // console.log(this.isModalOpen)
      // if(this.isModalOpen = false){
      //   alert('y')
      // this.router.navigateByUrl('/volunteer');
  
      // }
  
    }
    ionViewWillEnter() {
      this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 700ms');
    }
  
    onContentScroll(event:any) {
      if (event.detail.scrollTop >= 50) {
        this.renderer.setStyle(this.header['el'], 'top', '-76px');
      } else {
        this.renderer.setStyle(this.header['el'], 'top', '0px');
      }
    }
   
}
