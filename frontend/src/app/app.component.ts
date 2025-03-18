import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoryManagementComponent} from './components/owners/category-management/category-management.component';
import {DashboardComponent } from './components/owners/dashboard/dashboard.component';
import { MenuManagementComponent } from './components/owners/menu-management/menu-management.component';
// import { OrderComponent } from './components/owners/order/order.component';
import { CustomerInfoComponent } from './components/owners/customer/customer.component';

import { OwnerSettingsComponent } from './components/owners/settings/settings.component';
import { SidebarComponent } from './components/owners/sidebar/sidebar.component';
// import { UserManagementComponent } from './components/owners/user-management/user-management.component';
import { CategorySalesReportComponent } from './components/owners/category-sales-report/category-sales-report.component';
import { CustomerSalesReportComponent } from './components/owners/customer-sales-report/customer-sales-report.component';
import { ConfirmationDialogComponent } from './components/owners/confirmation-dialog/confirmation-dialog.component';

import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { TokenManagementComponent } from './components/owners/token-management/token-management.component';
import { provideHttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotifierModule } from 'angular-notifier';
import { CategorySelectionComponent } from './components/customers/categoryselection/categoryselection.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,CommonModule,MainPageComponent,LandingComponent,CustomerFormComponent,CategoryComponent,MenuComponent,CartComponent,PaymentComponent,OrderStatusComponent,CategoryManagementComponent,DashboardComponent,MenuManagementComponent,OwnerSettingsComponent,SidebarComponent,CategorySalesReportComponent,CustomerSalesReportComponent,ConfirmationDialogComponent,CategorySelectionComponent,CustomerInfoComponent,TokenManagementComponent,NotifierModule]
  ,templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cafe-project-f';
}

bootstrapApplication(AppComponent, {providers:[provideHttpClient()],}).catch(err => console.error(err));
