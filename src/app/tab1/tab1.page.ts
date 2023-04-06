import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  homeBanner: any = [{
    url: 'assets/vector/launch4.jpg'
  },{
    url: 'assets/vector/diet.webp'
  }]
  quickLink: any = [
    {
      icon: 'assets/homepage/qck1.svg',
      name: 'Courses',
      url: '/courses'
    },
    {
      icon: 'assets/homepage/qck2.svg',
      name: 'Diet Charts',
      url: '/dietplan'
    },
    {
      icon: 'assets/homepage/qck3.svg',
      name: 'Support',
    },
    {
      icon: 'assets/homepage/qck4.png',
      name: 'Calander',
    }
  ]
  slideServiceReport = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay: false
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
  }
  service: any = [{
    title: 'House Keeping',
    date: '13 April,22',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'House Keeping',
    date: '13 April,22',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'House Keeping',
    date: '13 April,22',
    status: 'resolved',
    remark: 'cleaning not happening on daily basis in my room',
    status1: 'Resolve-Done',
    status2: 'Resolve by Jaishankar-Admin manager'
  },{
    title: 'House Keeping',
    date: '13 April,22',
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
    name: 'Nikhil Chaudhary',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  },{
    title: 'Student of the Year',
    date: '12-01-2021',
    name: 'Nikhil Chaudhary',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  },{
    title: 'Student of the Year',
    date: '12-01-2021',
    name: 'Nikhil Chaudhary',
    stream: 'BCA II Year',
    clg: 'Deen Dayal College'
  }]
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
    name: 'Nikhil Chaudhary'
  }]

  dataView:any=[];



  constructor(
    private router: Router
  ) {}

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

}
