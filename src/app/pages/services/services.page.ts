import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
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
}
