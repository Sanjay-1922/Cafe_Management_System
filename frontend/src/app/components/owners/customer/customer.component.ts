// import { Component, inject } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { SidebarComponent } from '../sidebar/sidebar.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-customer-info',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css'],
//   imports: [HttpClientModule, SidebarComponent, CommonModule, FormsModule]
// })
// export class CustomerInfoComponent {
//   searchCustomer: string = '';
//   customers: any[] = [];
//   newCustomers: any[] = [];
//   returningCustomers: any[] = [];
//   errorMessage: string = '';

//   http = inject(HttpClient);

//   constructor() {
//     this.fetchAllCustomers();
//   }

//   private getHeaders(): HttpHeaders {
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0' // Replace with your actual token
//     });
//   }

//   searchByCustomer() {
//     if (!this.searchCustomer.trim()) return;

//     const headers = this.getHeaders();

//     this.http.get(`https://localhost:7023/api/Customer/search?name=${this.searchCustomer}`, { headers }).subscribe(
//       (response: any) => {
//         this.customers = response;
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Error searching customers', error);
//         this.errorMessage = 'Error searching customers. Please try again later.';
//       }
//     );
//   }

//   fetchAllCustomers() {
//     const headers = this.getHeaders();

//     this.http.get('https://localhost:7023/api/Customer', { headers }).subscribe(
//       (response: any) => {
//         this.customers = response;
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Error fetching all customers', error);
//         this.errorMessage = 'Error fetching all customers. Please try again later.';
//       }
//     );
//   }

//   fetchNewCustomers() {
//     const headers = this.getHeaders();

//     this.http.get('https://localhost:7023/api/Customer/new', { headers }).subscribe(
//       (response: any) => {
//         this.newCustomers = response;
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Error fetching new customers', error);
//         if (error.status === 400 && error.error && error.error.errors) {
//           const validationErrors = error.error.errors;
//           let errorMessage = 'Validation errors occurred:\n';
//           for (const key in validationErrors) {
//             if (validationErrors.hasOwnProperty(key)) {
//               errorMessage += `${key}: ${validationErrors[key].join(', ')}\n`;
//             }
//           }
//           this.errorMessage = errorMessage;
//         } else {
//           this.errorMessage = 'Error fetching new customers. Please try again later.';
//         }
//       }
//     );
//   }

//   fetchReturningCustomers() {
//     const headers = this.getHeaders();

//     this.http.get('https://localhost:7023/api/Customer/returning', { headers }).subscribe(
//       (response: any) => {
//         this.returningCustomers = response;
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Error fetching returning customers', error);
//         this.errorMessage = 'Error fetching returning customers. Please try again later.';
//       }
//     );
//   }
// }


import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  standalone: true,
  imports: [HttpClientModule, SidebarComponent, CommonModule, FormsModule]
})
export class CustomerInfoComponent {
  customers: any[] = [];
  searchCustomer: string = '';
  selectedCustomer: any = null; // For editing
  http = inject(HttpClient);
  private apiUrl = 'https://localhost:7023/api/Customer'; // Backend API

  constructor() {
    this.fetchAllCustomers();
  }

  // ✅ Headers with Authorization Token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0' // Replace with actual token
    });
  }

  // ✅ Fetch All Customers
  fetchAllCustomers() {
    const headers = this.getHeaders();
    this.http.get(this.apiUrl, { headers }).subscribe(
      (response: any) => {
        this.customers = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching customers:', error);
        alert('Failed to fetch customers!');
      }
    );
  }

  // ✅ Search Customer by Name
  searchByCustomer() {
    if (!this.searchCustomer.trim()) return;
    const headers = this.getHeaders();
    this.http.get(`${this.apiUrl}/search?name=${this.searchCustomer}`, { headers }).subscribe(
      (response: any) => {
        this.customers = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching customers:', error);
        alert('Failed to search customers!');
      }
    );
  }

  // ✅ Open Edit Modal with Selected Customer Data
  openEditModal(customer: any) {
    this.selectedCustomer = { ...customer }; // Copy customer data
  }

  // ✅ Update Customer Data
  updateCustomer() {
    if (!this.selectedCustomer) return;
    const headers = this.getHeaders();
    this.http.put(`${this.apiUrl}/${this.selectedCustomer.customerId}`, this.selectedCustomer, { headers })
      .subscribe(
        () => {
          alert('Customer updated successfully!');
          this.fetchAllCustomers();
          this.selectedCustomer = null; // Close modal
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating customer:', error);
          alert('Failed to update customer!');
        }
      );
  }

  // ✅ Delete Customer
  deleteCustomer(customerId: number) {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    const headers = this.getHeaders();
    this.http.delete(`${this.apiUrl}/${customerId}`, { headers }).subscribe(
      () => {
        alert('Customer deleted successfully!');
        this.customers = this.customers.filter(c => c.customerId !== customerId);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting customer:', error);
        alert('Failed to delete customer!');
      }
    );
  }
}