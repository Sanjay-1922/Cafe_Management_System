import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,SidebarComponent]
})
export class OrderManagementComponent {
  orders: any[] = [];
  http = inject(HttpClient);
  private apiUrl = 'https://localhost:7023/api/Order'; // Replace with your actual backend URL
  statusOptions = ['Processing', 'Ready', 'Completed']; // Dropdown options

  constructor() {
    this.getOrders();
  }

  // ✅ Fetch Orders from Backend
  getOrders() {
    const headers = this.getHeaders();
    this.http.get(this.apiUrl, { headers }).subscribe(
      (res: any) => {
        this.orders = res;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders!');
      }
    );
  }

  // ✅ Update Order Status (Dropdown Selection)
  updateOrderStatus(orderId: number, newStatus: string) {
    const headers = this.getHeaders();
    const body = JSON.stringify(newStatus);

    this.http.put(`${this.apiUrl}/${orderId}/status`, body, { headers, responseType: 'text' })
      .subscribe(
        () => {
          alert(`Order status updated to ${newStatus}!`);
          this.orders = this.orders.map(order =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          );
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating order status:', error);
          alert('Failed to update order status!');
        }
      );
  }

  // ✅ Get Headers with Authorization
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0` // Replace with actual token
    });
  }
}