import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-category-sales-report',
  templateUrl: './category-sales-report.component.html',
  styleUrls: ['./category-sales-report.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, SidebarComponent],
})
export class CategorySalesReportComponent {
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  selectedDate: string = '';
  selectedCategory: string = '';
  selectedItem: string = '';
  salesData: any = null;
  totalRevenue: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  // ✅ Get Headers for API Calls
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0' // Replace with actual token
    });
  }

  // ✅ Fetch Sales Report (Dynamic Based on Inputs)
  fetchSalesReport() {
    if (!this.selectedDate) {
      this.errorMessage = "Please enter a valid date.";
      return;
    }

    let url = `https://localhost:7023/api/Report/daily-sales?date=${this.selectedDate}`;
    
    if (this.selectedCategory.trim()) {
      url = `https://localhost:7023/api/Report/category?date=${this.selectedDate}&category=${this.selectedCategory}`;
    }

    if (this.selectedCategory.trim() && this.selectedItem.trim()) {
      url = `https://localhost:7023/api/Report/item?date=${this.selectedDate}&category=${this.selectedCategory}&item=${this.selectedItem}`;
    }

    this.fetchSalesData(url);
  }

  // ✅ Fetch Daily Sales Report
  fetchDailySalesReport() {
    if (!this.selectedDate) {
      this.errorMessage = "Please enter a valid date.";
      return;
    }
  
    const url = `https://localhost:7023/api/Report/daily-sales?date=${this.selectedDate}`;
    this.fetchSalesData(url);
  }

  // ✅ Fetch Category Sales Report
  fetchCategorySalesReport() {
    if (!this.selectedDate || !this.selectedCategory) {
      this.errorMessage = "Please enter a valid date and category.";
      return;
    }
  
    const url = `https://localhost:7023/api/Report/category?date=${this.selectedDate}&category=${this.selectedCategory}`;
    this.fetchSalesData(url);
  }
  
  // ✅ Fetch Item Sales Report
  fetchItemSalesReport() {
    if (!this.selectedDate || !this.selectedCategory || !this.selectedItem) {
      this.errorMessage = "Please enter a valid date, category, and item.";
      return;
    }
  
    const url = `https://localhost:7023/api/Report/item?date=${this.selectedDate}&category=${this.selectedCategory}&item=${this.selectedItem}`;
    this.fetchSalesData(url);
  }

  // ✅ Fetch Data from API
  private fetchSalesData(url: string) {
    this.isLoading = true;
    this.errorMessage = '';
  
    this.http.get(url, { headers: this.getHeaders() }).subscribe(
      (res: any) => {
        console.log("🟢 API Response:", res); // Verify the API response structure
        this.salesData = Array.isArray(res) ? res : [res];
        this.calculateTotalRevenue(); // Ensure `salesData` is treated as an array
        this.isLoading = false;
        this.cdr.detectChanges(); // Ensure the UI is updated
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = "Error fetching sales data.";
        this.isLoading = false;
      }
    );
  }
  private calculateTotalRevenue() {
    this.totalRevenue = 0;
    this.salesData.forEach((item: {
      items: any; totalRevenue: any; }) => {
      item.items.forEach((item: { totalRevenue: any; }) => {
        this.totalRevenue += item.totalRevenue;
      })
  })
    // this.totalRevenue = this.salesData.reduce((sum: any, item: { totalRevenue: any; }) => sum + item.totalRevenue, 0);
    // if (this.selectedCategory && this.selectedItem) {
    //   this.totalRevenue = this.salesData.reduce((sum: any, item: { totalRevenue: any; }) => sum + item.totalRevenue, 0);
    // } else if (this.selectedCategory) {
    //   this.totalRevenue = this.salesData.reduce((sum: any, category: { totalCategoryRevenue: any; }) => sum + category.totalCategoryRevenue, 0);
    // } else {
    //   this.totalRevenue = this.salesData.reduce((sum: any, day: { totalRevenue: any; }) => sum + day.totalRevenue, 0);
    // }
  }
}