import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, SidebarComponent]
})
export class DashboardComponent implements OnInit {
  http = inject(HttpClient);
  private apiUrl = 'https://localhost:7023/api/Order'; // Backend Order API
  orders: any[] = [];

  totalOrders = 0;
  pendingOrders = 0;
  completedOrders = 0;
  canceledOrders = 0;
  todayRevenue = 0;
  monthlyRevenue = 0;

  constructor() { }

  ngOnInit() {
    this.getOrders();

  }

  // ✅ Fetch Orders from Backend
  getOrders() {
    const headers = this.getHeaders();

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe(
      (res: any[]) => {  // Ensure response type is an array
        this.orders = res || [];
        this.calculateMetrics();// Assign response or an empty array to prevent issues
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders!');
      }
    );
  }

  calculateMetrics() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const currentMonth = new Date().getMonth();

    this.totalOrders = this.orders.length;
    this.pendingOrders = this.orders.filter(o => o.status === 'Processing' || o.status === 'Ready').length;
    this.completedOrders = this.orders.filter(o => o.status === 'Completed').length;
    this.canceledOrders = this.orders.filter(o => o.status === 'Canceled').length;

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime());
    
    this.todayRevenue = this.orders
      .filter(o => o.status === 'Completed' && new Date(o.orderDate).getDate() === now.getDate())
      .reduce((sum, o) => sum + o.totalAmount, 0);

    this.monthlyRevenue = this.orders
      .filter(o => o.status === 'Completed' && new Date(o.orderDate).getMonth() === currentMonth)
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0`
    });
  }
}