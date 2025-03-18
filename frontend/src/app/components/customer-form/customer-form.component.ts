import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class CustomerFormComponent {
  customer = {
    name: '',
    phoneNumber: '',
    email: ''
  };

  errorMessage = '';
  apiUrl = 'https://localhost:7023/api/Customer'; // Backend URL

  constructor(private router: Router, private http: HttpClient) { }

  validateForm(): boolean {
    const { name, phoneNumber, email } = this.customer;

    if (!name.trim() || name.length < 3) {
      this.errorMessage = 'Name must be at least 3 characters.';
      return false;
    }

    if (!phoneNumber.match(/^\d{10}$/)) {
      this.errorMessage = 'Phone Number must be exactly 10 digits.';
      return false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.errorMessage = 'Invalid Email format.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  submitForm() {
    if (this.validateForm()) {
      this.http.post(this.apiUrl, this.customer).subscribe({
        next: (response: any) => {
          localStorage.setItem('customerId', response.customerId); // Store CustomerId
          this.router.navigate(['/CategorySelection']); // Move to category selection
        },
        error: (err) => {
          this.errorMessage = 'Failed to register. Please try again.';
          console.error(err);
        }
      });
    }
  }
  navigateTocategorySelection() {
    this.router.navigate(['/CategorySelection']); // Navigate to Category Selection
  }
}