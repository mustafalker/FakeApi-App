import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  { path: 'comment/:id', component: NotificationsComponent },
  // { path: 'notifications/:id', component: NotificationsComponent }
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

// { path: 'comment/:postId', component: NotificationsComponent },
// { path: 'comment/:name', component: NotificationsComponent },
// { path: 'comment/:email', component: NotificationsComponent },
// { path: 'comment/:body', component: NotificationsComponent }