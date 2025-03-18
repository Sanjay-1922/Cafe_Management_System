import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainPageComponent } from './components/main-page/main-page.component';
import { LandingComponent } from './components/landing/landing.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

import { CategoryComponent } from './components/category/category.component';

import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';

import { OrderStatusComponent } from './components/order-status/order-status.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/owners/dashboard/dashboard.component';
import { OrderManagementComponent } from './components/owners/order-management/order-management.component';
import { MenuManagementComponent } from './components/owners/menu-management/menu-management.component';
import { CategoryManagementComponent } from './components/owners/category-management/category-management.component';

import { CategorySalesReportComponent } from './components/owners/category-sales-report/category-sales-report.component';


import { OwnerSettingsComponent } from './components/owners/settings/settings.component';
import { OwnerMainComponent } from './components/owners/owner-main/owner-main.component';
import { CustomerSalesReportComponent } from './components/owners/customer-sales-report/customer-sales-report.component';
import { CategorySelectionComponent } from './components/customers/categoryselection/categoryselection.component';

import { CustomerInfoComponent } from './components/owners/customer/customer.component';
import { TokenManagementComponent } from './components/owners/token-management/token-management.component';
export const routes: Routes = [

  { path: '', component: MainPageComponent },

  { path: '', component: LandingComponent },

  { path: 'customer-form', component: CustomerFormComponent },

  { path: 'categories', component: CategoryComponent },

  { path: 'menu/:id', component: MenuComponent }, // Dynamic Category ID
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },

  { path: 'order-status', component: OrderStatusComponent },
  { path: 'landing', component: LandingComponent },
  {
    path: 'account',
    component: AccountComponent
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'order-management', component: OrderManagementComponent },
  { path: 'menu-management', component: MenuManagementComponent },
  { path: 'category-management', component: CategoryManagementComponent },

  { path: 'order-status', component: OrderStatusComponent },
  { path: 'owners', component: OwnerMainComponent },

  { path: 'ownersetting', component: OwnerSettingsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'category-sales-report', component: CategorySalesReportComponent },
  { path: 'customer-sales-report', component: CustomerSalesReportComponent },
  { path: 'CategorySalesReportComponent', component: CategorySalesReportComponent },
  { path: 'CategorySelection', component: CategorySelectionComponent },
  { path: 'customer', component: CustomerInfoComponent },
  { path: 'payment/:orderId/:amount', component: PaymentComponent },
  { path: 'order-status/:tokenId', component: OrderStatusComponent },
  { path: 'token-management', component: TokenManagementComponent },
  { path: 'token-management/:tokenId', component: TokenManagementComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },


];



