import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-owner-settings',
  standalone: true,
  imports: [CommonModule, FormsModule,SidebarComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class OwnerSettingsComponent {
  // Active tab (default: 'cafe')
  activeTab: string = 'cafe';

  // Café Information
  cafeName: string = 'Cafe Delight';
  tagline: string = 'Savor Every Bite, Enjoy Every Sip!';
  logoUrl: string = 'assets/logo.png';
  address: string = '123 Cafe Street, Food City';
  contact: string = '+123 456 7890';
  socialLinks = { facebook: '', instagram: '', twitter: '' };

  // Operating Hours
  openTime: string = '08:00';
  closeTime: string = '22:00';

  // Payment Settings
  acceptedPayments: string[] = ['Cash', 'Card', 'UPI'];
  refundPolicy: string = 'Refund within 7 days';

  // Tax & Pricing
  taxRate: number = 5;  // in percent
  discountPolicy: string = 'Seasonal discounts available';

  // Notification Preferences
  notifyLowInventory: boolean = true;
  notifyNewOrders: boolean = true;
  notifyCancellations: boolean = true;

  // User & Access Management (dummy data)
  users = [
    { id: 1, name: 'Alice Johnson', role: 'Staff' },
    { id: 2, name: 'Bob Smith', role: 'Staff' }
  ];

  // Methods to switch tabs
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Save/update settings (dummy implementation)
  saveSettings() {
    alert('Settings saved successfully!');
    // Later: Connect to backend API to save these settings
  }
}