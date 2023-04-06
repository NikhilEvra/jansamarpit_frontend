import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public appPages = [
    { title: 'Inventory', url: '/inventory', icon: 'mail' },
    { title: 'Sales', url: '/sales', icon: 'paper-plane' },
    { title: 'Complaints', url: '/complaints', icon: 'heart' },
    { title: 'Services', url: '/services', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = [ 'Feedback', 'Forget Password'];
  constructor() {}
}

