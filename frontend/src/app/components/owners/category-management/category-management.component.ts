import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink, SidebarComponent],
  host: { 'skiphydration': 'true' }
})
export class CategoryManagementComponent {
  categories: any[] = [];
  http = inject(HttpClient);
  router = inject(Router);

  newCategory = { categoryId: 0, name: '', itemsCount: 0, menuItems: [] };
  isEditing = false;
  editCategoryId: number | null = null;
  searchName: string = '';

  constructor() { this.getCategories(); }

  /** ✅ Fetch Categories */
  getCategories() {
    const headers = this.getHeaders();
    this.http.get('https://localhost:7023/api/Category', { headers }).subscribe(
      (res: any) => {
        this.categories = res;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  /** ✅ Add Category */
  addCategory() {
    if (!this.newCategory.name.trim()) return;

    const category = { name: this.newCategory.name };
    const headers = this.getHeaders();

    this.http.post('https://localhost:7023/api/Category', category, { headers }).subscribe(
      () => {
        alert('Category Added Successfully!');
        this.getCategories();
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert('Failed to add category');
        console.error('Error:', error);
      }
    );
  }

  /** ✅ Edit Category */
  editCategory(category: any) {
    this.isEditing = true;
    this.editCategoryId = category.categoryId;
    this.newCategory = { ...category };
  }

  /** ✅ Update Category */
  updateCategory() {
    if (!this.newCategory.name.trim()) return;

    const categoryData = { name: this.newCategory.name };
    const headers = this.getHeaders();

    this.http.put(`https://localhost:7023/api/Category/${this.editCategoryId}`, categoryData, { headers }).subscribe(
      () => {
        alert('Category Updated Successfully!');
        this.getCategories();
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        alert('Failed to update category');
        console.error('Error:', error);
      }
    );
  }

  /** ✅ Delete Category */
  deleteCategory(categoryId: number) {
    const headers = this.getHeaders();

    this.http.delete(`https://localhost:7023/api/Category/${categoryId}`, { headers }).subscribe(
      () => {
        alert('Category Deleted Successfully!');
        this.getCategories();
      },
      (error: HttpErrorResponse) => {
        alert('Failed to delete category');
        console.error('Error:', error);
      }
    );
  }

  /** ✅ Confirm before deleting */
  confirmDelete(categoryId: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.deleteCategory(categoryId);
    }
  }

  /** ✅ Reset Form */
  resetForm() {
    this.newCategory = { categoryId: 0, name: '', itemsCount: 0, menuItems: [] };
    this.isEditing = false;
  }

  /** ✅ Search Categories */
  searchCategories() {
    if (this.searchName.trim()) {
      this.categories = this.categories.filter(cat =>
        cat.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    } else {
      this.getCategories();
    }
  }

  /** ✅ Get Headers with Authorization */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0' // Replace with actual token
    });
  }
}