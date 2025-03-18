import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink, SidebarComponent],
  host: { 'skiphydration': 'true' }
})
export class MenuManagementComponent {
  menuItems: any[] = [];
  http = inject(HttpClient);
  router = inject(Router);

  newItem = { menuItemId: 0, name: '', price: 0, category: '' };
  isEditing = false;
  editItemId: number | null = null;

  constructor() {
    this.getMenuItems();
  }

  // ✅ Fetch Menu Items
  getMenuItems() {
    const headers = this.getHeaders();
    this.http.get('https://localhost:7023/api/MenuItem', { headers }).subscribe(
      (res: any) => {
        this.menuItems = res;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching menu items', error);
      }
    );
  }

  // ✅ Add Menu Item
  addMenuItem() {
    if (!this.newItem.name.trim() || this.newItem.price <= 0 || !this.newItem.category.trim()) return;

    const menuItem = {
      name: this.newItem.name,
      price: this.newItem.price,
      category: this.newItem.category
    };
    const headers = this.getHeaders();

    this.http.post('https://localhost:7023/api/MenuItem', menuItem, { headers }).subscribe(
      () => {
        alert('Menu Item Added Successfully!');
        this.getMenuItems();
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert('Failed to add menu item');
        console.error('Error:', error);
      }
    );
  }

  // ✅ Edit Menu Item
  editMenuItem(item: any) {
    this.isEditing = true;
    this.editItemId = item.menuItemId;
    this.newItem = { ...item };
  }

  // ✅ Update Menu Item
  updateMenuItem() {
    if (!this.newItem.name.trim() || this.newItem.price <= 0 || !this.newItem.category.trim()) return;

    const menuItemData = {
      name: this.newItem.name,
      price: this.newItem.price,
      category: this.newItem.category
    };
    const headers = this.getHeaders();

    this.http.put(`https://localhost:7023/api/MenuItem/${this.editItemId}`, menuItemData, { headers }).subscribe(
      () => {
        alert('Menu Item Updated Successfully!');
        this.getMenuItems();
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert('Failed to update menu item');
        console.error('Error:', error);
      }
    );
  }

  // ✅ Delete Menu Item
  deleteMenuItem(menuItemId: number) {
    const headers = this.getHeaders();

    this.http.delete(`https://localhost:7023/api/MenuItem/${menuItemId}`, { headers }).subscribe(
      () => {
        alert('Menu Item Deleted Successfully!');
        this.getMenuItems();
      },
      (error: HttpErrorResponse) => {
        alert('Failed to delete menu item');
        console.error('Error:', error);
      }
    );
  }

  // ✅ Reset Form
  resetForm() {
    this.newItem = { menuItemId: 0, name: '', price: 0, category: '' };
    this.isEditing = false;
  }

  // ✅ Get Headers with Authorization
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0' // Replace with actual token
    });
  }
}