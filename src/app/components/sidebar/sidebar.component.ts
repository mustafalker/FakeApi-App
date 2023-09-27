import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Add Comment',  icon:'add_comment', class: '' },
    { path: '/table-list', title: 'Read Comment',  icon:'library_books', class: '' },
    { path: '/typography', title: 'Removo Comment',  icon:'delete', class: '' },
    { path: '/notifications', title: 'Update Comment',  icon:'update', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
