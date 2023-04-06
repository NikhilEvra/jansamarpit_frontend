import { Component } from '@angular/core';
import { AttendanceService } from '../service/attendance/attendance.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // title : any;
  // series : any=[];
  // chart : any;
  att:any=['2023-03-21','2023-03-22'];
  attendance:any=[];
  att1:any=[];
  comment: any = [{
    name: 'Total Atendance ',
    status: 'Present Days',
    date: '100',
    bg: '#B0CCBB',
  },{
    name: 'Total',
    status: 'days class taken',
    date: '90',
    bg: '#EFFCFA',
  }];
  dayvalue:any=['21','22'];
 

  constructor(
    private api : AttendanceService,
  ) {}

  ngOnInit() {
    // this.chart1();
    this.getattendance();

  }
  getattendance(){
     
  this.api.getattendancedata().subscribe({
    next:(data) =>{
      // console.log(data);
      this.attendance = data;
      // console.log(this.attendance[0].adate);
      this.attendance.forEach((element: any) => {
        //  console.log(element);
        // console.log(element.attendance);
        this.att1.push(element.adate);
      });
      console.log(this.att1);
    
      // this.response2 = data;
    },
    error:() =>{
      // alert('error occured');
      // this.presentToast('Internal Server Error.' , 'Danger');
    },
    complete:() =>{
   
        
    }
  })
  }

  // chart1() : void{
  //   this.title = {
  //     text : 'Attendence',
  //   };
  //   this.series =[{
  //     name : 'Present',
  //     data : [10,20,12,11,10,23]
  //   }];
  //   this.chart = {
  //     type : 'bar'
  //   };

  // }

}
