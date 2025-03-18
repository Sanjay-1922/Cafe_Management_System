import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-owner-main',
  standalone: true,
  imports: [CommonModule,RouterModule,SidebarComponent],
  templateUrl: './owner-main.component.html',
  styleUrls: ['./owner-main.component.css']
})
export class OwnerMainComponent {
  showHomePage: boolean = true;

  constructor(private router: Router) {}

  showHome() {
    this.showHomePage = true;
  }

  logout() {
    // Perform logout logic here (e.g., clear session storage, remove tokens)
    localStorage.removeItem('authToken'); // Example: Remove stored token
    this.router.navigate(['/']); // Redirect to the home/login page
  }

  ngOnInit() {
    this.showHomePage = true;
  }
}