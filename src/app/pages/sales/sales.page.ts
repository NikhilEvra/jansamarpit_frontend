import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openPage(url : any){
    this.router.navigateByUrl(url);
  }

}
