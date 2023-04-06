import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
 
  todaySpecial:any =[{
    image: 'assets/vector/course1.jpg',
    name: 'karate Class',
   
    avl: 20
  }]
  constructor() { }

  ngOnInit() {
  }

}
