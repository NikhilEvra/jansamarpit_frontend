import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/service/poll/poll.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pollanswers',
  templateUrl: './pollanswers.page.html',
  styleUrls: ['./pollanswers.page.scss'],
})
export class PollanswersPage implements OnInit {
  isModalOpen = false;
  USTEMP = localStorage.getItem('user');

  getuserdata: any=[];
  answers:any=[];
  answer2:any=[];
  answer3:any=[];

  title : any;
  series:any=[];
  chart : any;
  xaxis:any=[];
  cdata:any= [];
  dat:any=[];
  
  slideAchivement = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay: false
  }

  constructor(
    private api : PollService

  ) { 
    if (this.USTEMP) {
      this.getuserdata = JSON.parse(this.USTEMP) ;
    } 
  }

  ngOnInit() {
    this.get_answers();
    this.get_vs_poll();
    this.get_yes_no();
    this.graph_data();
    this.chart1();

  }

  
  chart1() : void{
    this.title = {
      text : 'Attendence',
    };
    this.series =[{
      name : 'Present',
      data : this.dat
    }];
    this.chart = {
      type : 'bar'
    };
    this.xaxis= {
      categories: ["A", "B", "C", "D"]
    }

  }

  
  action2(dat:any,que:any){
     
    // console.log(dat);
    // console.log(que);
    // console.log(this.getuserdata.u_id);
    const ans = {"u_id": this.getuserdata.u_id, "question": que, "answer": dat}
    this.api.post_answer(ans).subscribe({
      next:(data:any) =>{
        console.log(data);
      
    
      },
      error:() =>{
        Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'Internal Server Error',
           heightAuto: false , 
           timer: 3000
          });
      
      },
      complete:() =>{
       this.get_answers();
     
      }
    })
  
  }

  get_answers(){
    const que = {"u_id" : this.getuserdata.u_id};
    this.api.get_poll_answers(que).subscribe({
      next:(data:any) =>{
        console.log(data);
        this.answers = data;
       
    
      },
      error:() =>{
       
      
      },
      complete:() =>{
       
     
       
      }
    })
  
  }

  get_vs_poll(){
    const que = {"u_id" : this.getuserdata.u_id};
    this.api.get_poll_answers_vs(que).subscribe({
      next:(data:any) =>{
        console.log(data);
        this.answer2 = data;
       
    
      },
      error:() =>{
       
      
      },
      complete:() =>{
       
     
       
      }
    })
  
  }
  action(dat:any,que:any){

    const ans = {"u_id": this.getuserdata.u_id, "question": que , "answer": dat}
    this.api.post_answer(ans).subscribe({
      next:(data:any) =>{
        console.log(data);
      
      },

      error:() =>{
        Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'Internal Server Error',
           heightAuto: false , 
           timer: 3000
          });
      
      },
      complete:() =>{
       this.get_vs_poll();
     
      }
    })
  
  }

  get_yes_no(){
    const que = {"u_id" : this.getuserdata.u_id};
    this.api.get_poll_answers_yesno(que).subscribe({
      next:(data:any) =>{
        console.log(data);
        this.answer3 = data;
       
    
      },
      error:() =>{
       
      
      },
      complete:() =>{
       
     
       
      }
    })
  
  }

  action3(dat:any,que:any){

    const ans = {"u_id": this.getuserdata.u_id, "question": que , "answer": dat}
    this.api.post_answer(ans).subscribe({
      next:(data:any) =>{
        console.log(data);
      
      },

      error:() =>{
        Swal.fire({
          'imageUrl' :'assets/icon/login.gif',
          'imageHeight':'100px', 
          'title': 'Internal Server Error',
           heightAuto: false , 
           timer: 3000
          });
      
      },
      complete:() =>{
       this.get_yes_no();
     
      }
    })
  
  }

  
  graph_data(){
    this.api.get_graph_data().subscribe({
      next:(data:any) =>{
        console.log(data);
       this.cdata = data;
       this.cdata.forEach((element: any) => {
        //  console.log(element);
        // console.log(element.data);
       this.dat.push(element.data);
      });
      // console.log([this.cdata[0].data,this.cdata[0].data2])
    
      },
      error:() =>{
       
      
      },
      complete:() =>{
       
     
       
      }
    })
  
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
