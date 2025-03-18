import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

interface PaymentRequest {
  orderId: number;
  amount: number;
  paymentMethod: string;
}

interface PaymentResponse {
  paymentId: number;
  orderId: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  tokenNumber: string;
  tokenId: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink]
})
export class PaymentComponent implements OnInit {
  orderId!: number;
  totalAmount: number = 0;
  paymentMethod: string = '';
  paymentSuccess: boolean = false;
  tokenNumber: string = '';
  tokenId: number = 0;

  upiId: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  apiUrl = 'https://localhost:7023/api/Payment';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private location :Location) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.totalAmount = Number(this.route.snapshot.paramMap.get('amount'));

    if (!this.orderId || this.totalAmount <= 0) {
      alert('Invalid order details!');
      this.router.navigate(['/cart']);
    }
  }

  validatePayment(): boolean {
    if (!this.paymentMethod) {
      alert('Please select a payment method.');
      return false;
    }

    if (this.paymentMethod === 'UPI' && !this.upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g., yourname@upi).');
      return false;
    }

    if (this.paymentMethod === 'Credit Card') {
      const cardRegex = /^\d{16}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;

      if (!cardRegex.test(this.cardNumber)) {
        alert('Please enter a valid 16-digit card number.');
        return false;
      }

      if (!expiryRegex.test(this.expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY).');
        return false;
      }

      if (!cvvRegex.test(this.cvv)) {
        alert('Please enter a valid 3-digit CVV.');
        return false;
      }
    }

    return true;
  }

  processPayment() {
    if (!this.validatePayment()) return;

    const paymentRequest: PaymentRequest = {
      orderId: this.orderId,
      amount: this.totalAmount,
      paymentMethod: this.paymentMethod
    };

    this.http.post<PaymentResponse>(this.apiUrl, paymentRequest).subscribe(
      (response) => {
        this.paymentSuccess = true;
        this.tokenNumber = response.tokenNumber;
        this.tokenId = response.tokenId;
      },
      (error) => {
        console.error('Payment failed:', error);
        alert('Payment failed! Try again.');
      }
    );
  }

  goToOrderStatus() {if(this.tokenId){
    this.router.navigate(['/order-status', this.tokenId]);
  }else{
    alert('Payment not processed yet!');
  }
}
goBack() {
  this.location.back();
}
}