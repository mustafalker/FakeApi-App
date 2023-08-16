import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'AddCommentFromApi',  icon: 'add', class: '' },
    { path: '/user-profile', title: 'AddCommentFromVS',  icon:'add_comment', class: '' },
    { path: '/table-list', title: 'ReadComment',  icon:'library_books', class: '' },
    { path: '/typography', title: 'RemovoComment',  icon:'delete', class: '' },
    { path: '/notifications', title: 'UpdateComment',  icon:'update', class: '' },
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
