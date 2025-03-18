import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-selection',
  standalone: true,
  templateUrl: './categorySelection.component.html',
  styleUrls: ['./categorySelection.component.css'],
  imports: [CommonModule, RouterLink, HttpClientModule],
})
export class CategorySelectionComponent {
  categories: any[] = [];
  cartItemCount: number = 0; // Cart count for the icon
  http = inject(HttpClient);
  router = inject(Router);

  categoryApiUrl = 'https://localhost:7023/api/Category'; // Replace with actual API URL
  cartApiUrl = 'https://localhost:7023/api/Cart/add'; // API for adding to cart
  cartCountApiUrl = 'https://localhost:7023/api/Cart/count'; // API for getting cart count
  cartDetailsApiUrl = 'https://localhost:7023/api/Cart/details'; // API to fetch cart details

  constructor() {
    this.getCategories();
    this.getCartCount(); // Fetch initial cart count
  }

  /** ✅ Fetch Categories (Including Menu Items with ID) */
  getCategories() {
    this.http.get(this.categoryApiUrl).subscribe(
      (res: any) => {
        this.categories = res;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  /** ✅ Fetch Cart Item Count */
  getCartCount() {
    this.http.get<number>(this.cartCountApiUrl).subscribe(
      (count) => {
        this.cartItemCount = count;
      },
      (error) => {
        console.error('Error fetching cart count', error);
      }
    );
  }

  /** ✅ Fetch Cart Details (Optional: Can be used for real-time updates) */
  getCartDetails() {
    this.http.get(this.cartDetailsApiUrl).subscribe(
      (cart: any) => {
        this.cartItemCount = cart.items.length;
      },
      (error) => {
        console.error('Error fetching cart details', error);
      }
    );
  }

  /** ✅ Navigate to Menu Items */
  selectCategory(categoryId: number) {
    this.router.navigate(['/menu-items', categoryId]);
  }

  /** ✅ Add Item to Cart */
  addToCart(menuItemId: number, quantity: number = 1) {
    const customerId = 1; // Replace with actual logged-in customer ID

    const cartItem = {
      customerId: customerId,
      menuItemId: menuItemId,
      quantity: quantity,
    };

    this.http.post(this.cartApiUrl, cartItem, { responseType: 'text' }).subscribe(
      (res) => {
        this.cartItemCount++; // 🔥 Update cart count on success
        alert(res); // Now this will correctly show "Item added successfully"
      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }

  /** ✅ Add Item to Cart */
  colors = [
    // '#B3E5FC', // Light Cyan
    // '#B2EBF2', // Light Teal
    '#B2DFDB', // Light Green
    // '#C8E6C9', // Light Lime
    // '#DCEDC8', // Light Yellow
    // '#F0F4C3', // Light Amber
    // '#FFF9C4', // Light Orange
    '#FFECB3', // Light Deep Orange
    // '#FFE0B2', // Light Brown
    // '#FFCCBC' , // Light Grey
    // '#FFCDD2', // Light Red
    // '#F8BBD0', // Light Pink
    // '#E1BEE7', // Light Purple
    // '#D1C4E9', // Light Indigo
    '#C5CAE9', // Light Blue
    // '#BBDEFB', // Light Sky Blue
    '#B3E5FC', // Light Cyan
    '#B2EBF2', // Light Teal
    '#B2DFDB', // Light Green
    '#C8E6C9', // Light Lime
    '#DCEDC8', // Light Yellow
    '#F0F4C3', // Light Amber
    '#FFF9C4', // Light Orange
    '#FFECB3', // Light Deep Orange
    '#FFE0B2', // Light Brown
    '#FFCCBC'  // Light Grey
  ];
  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }


  /** ✅ Navigate to Cart Page */
  goToCart() {
    this.router.navigate(['/cart']);
  }
}