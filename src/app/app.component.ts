import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home' },
    { title: 'Inventory', url: '/inventory', icon: 'star-half' },
    { title: 'Sales', url: '/sales', icon: 'stats-chart' },
    { title: 'Complaints', url: '/complaints', icon: 'clipboard' },
    { title: 'Services', url: '/services', icon: 'checkmark-done' },
    { title: 'Purchase Order', url: '/viewpo', icon: 'cart' },
    { title: 'Feedback', url: '/feedback', icon: 'file-tray-full' },
    // { title: 'Update Password', url: '/profile', icon: 'settings'},
  ];
  // public labels = ['Feedback', 'Forget Password'];
  constructor() {}
}

