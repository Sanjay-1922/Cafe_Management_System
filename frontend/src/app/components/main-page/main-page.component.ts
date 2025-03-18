import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MainPageComponent {
  selectedCategory: string | null = null;
  mobileNavOpen = false; // Toggle for mobile menu

  constructor(private router: Router) {}

  navigateTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  goToCustomers() {
    this.router.navigate(['/landing']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

  logout() {
    alert('Logged out successfully');
    this.router.navigate(['/']);
  }

  showMenu(category: string) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
  }
}