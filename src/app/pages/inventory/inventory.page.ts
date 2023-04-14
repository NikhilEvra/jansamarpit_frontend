import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  data:any=['test'];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openPage(url: any){
    this.router.navigateByUrl(url);
  }

  // land(dat : any){
  //   this.router.navigate(['po',{item:dat}])

  // }
}
