import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
interface CartItem {
  cartItemId: number;
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

interface CartResponse {
  cartId: number;
  customerId: number;
  items: CartItem[];
}

interface OrderResponse {
  orderId: number;
  totalAmount: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink],
})
export class CartComponent implements OnInit {
  customerId = 1; // Replace with actual customer ID
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  apiUrl = 'https://localhost:7023/api/Cart';

  constructor(private http: HttpClient, private router: Router,private location :Location) { }

  ngOnInit(): void {
    this.loadCart();
  }

  // Fetch cart data
  loadCart() {
    this.http.get<CartResponse>(`${this.apiUrl}/${this.customerId}`).subscribe(
      (response) => {
        this.cartItems = response.items.map(item => ({
          ...item,
          quantity: item.quantity || 1, // Ensure a minimum quantity
          totalPrice: item.pricePerUnit * (item.quantity || 1),
        }));
        this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  // Increase quantity
  increaseQuantity(cartItem: CartItem) {
    cartItem.quantity += 1;
    cartItem.totalPrice = cartItem.quantity * cartItem.pricePerUnit;
    this.calculateTotalAmount();
    this.updateCartItem(cartItem);
  }

  // Decrease quantity
  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      cartItem.totalPrice = cartItem.quantity * cartItem.pricePerUnit;
      this.calculateTotalAmount();
      this.updateCartItem(cartItem);
    }
  }

  // Calculate total amount
  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  // Update cart item
  updateCartItem(cartItem: CartItem) {
    const updateData = {
      customerId: this.customerId,
      menuItemId: cartItem.menuItemId,
      quantity: cartItem.quantity,
    };

    this.http.put(`${this.apiUrl}/update/${cartItem.cartItemId}`, updateData).subscribe(
      () => console.log('Cart updated successfully'),
      (error) => console.error('Error updating cart item:', error)
    );
  }

  // Remove item from cart
  removeItem(cartItemId: number) {
    this.http.delete(`${this.apiUrl}/remove/${cartItemId}`).subscribe(
      () => {
        // ✅ Immediately remove the item from the cartItems array
        this.cartItems = this.cartItems.filter(item => item.cartItemId !== cartItemId);
        this.calculateTotalAmount(); // Recalculate total
      },
      (error) => console.error('Error removing item:', error)
    );
  }
  

  // Place Order and Navigate to Payment Page
  placeOrder() {
    if (this.totalAmount === 0) {
      alert('Please add at least one item before placing an order.');
      return;
    }

    this.http.post<OrderResponse>(`${this.apiUrl}/placeorder?customerId=${this.customerId}`, {}).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        alert(`Order placed! Order ID: ${response.orderId}`);

        // Navigate to Payment Page with Order ID and Total Amount
        this.router.navigate(['/payment', response.orderId, this.totalAmount]);
      },
      (error) => console.error('Error placing order:', error)
    );
  }

  goBack() {
    this.location.back();
  }
  clearCart(){
    this.cartItems=[];
    this.totalAmount=0;
  }
}