import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-customer-sales-report',
  templateUrl: './customer-sales-report.component.html',
  styleUrls: ['./customer-sales-report.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,SidebarComponent],
})
export class CustomerSalesReportComponent {
  http = inject(HttpClient);

  selectedDate: string = '';
  customerName: string = '';
  salesData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0' // Replace with actual token
    });
  }

  fetchSalesReport() {
    if (!this.selectedDate) {
      this.errorMessage = "Please enter a valid date.";
      return;
    }

    let url = `https://localhost:7023/api/CustomerReport/daily-summary?date=${this.selectedDate}`;

    if (this.customerName.trim()) {
      url = `https://localhost:7023/api/CustomerReport/order-report?date=${this.selectedDate}&customerName=${this.customerName}`;
    }

    this.fetchSalesData(url);
  }

  fetchDailyCustomerSalesReport() {
    if (!this.selectedDate) {
      this.errorMessage = "Please enter a valid date.";
      return;
    }

    let url = `https://localhost:7023/api/CustomerReport/daily-summary?date=${this.selectedDate}`;
    this.fetchSalesData(url);
  }

  fetchCustomerOrderReport() {
    if (!this.selectedDate) {
      this.errorMessage = "Please enter a valid date.";
      return;
    }
  
    this.fetchDailyCustomerSalesReport(); // Fetch the daily summary first
  
    // Filter the sales data by customer name
    if (this.customerName.trim()) {
      this.salesData = this.salesData.filter(customer =>
        customer.customerName.toLowerCase().includes(this.customerName.toLowerCase())
      );
  
      // Recalculate order count and total spent for filtered data
      this.salesData.forEach(customer => {
        customer.orderCount = customer.orders.length;
        customer.totalSpent = customer.orders.reduce((total: number, order: { orderTotal: number }) => total + order.orderTotal, 0);
      });
    }
  }

  private fetchSalesData(url: string) {
    this.isLoading = true;
    this.errorMessage = '';
  
    console.log("🟢 Fetching data from URL:", url);
  
    this.http.get<any[]>(url, { headers: this.getHeaders() }).subscribe(
      (res: any[]) => {
        console.log("🟢 API Response:", res);
  
        if (!res || res.length === 0) {
            console.warn("⚠️ Warning: Empty response from API!");
            this.salesData = [];
            this.errorMessage = "No data available for the selected date and customer.";
        } else {
            this.salesData = res;
        }
  
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error("🔴 API Error:", error);
        this.errorMessage = "Error fetching sales data.";
        this.isLoading = false;
      }
    );
  }
}
