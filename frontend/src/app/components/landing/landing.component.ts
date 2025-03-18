import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-landing',
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private router: Router) {}
 
  navigateToCustomerForm() {
    this.router.navigate(['/customer-form']); // Navigate to Customer Form
    // this.router.navigate(['/category-selection']); // Navigate to Category Selection
  }

  goBack() {
    this.router.navigate(['/order-status']); // ✅ Navigate to landing page
  }
}
 