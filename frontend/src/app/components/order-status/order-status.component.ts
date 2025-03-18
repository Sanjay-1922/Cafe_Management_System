import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
interface TokenResponse {
  id: number;
  orderId: number;
  tokenNumber: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
  imports: [HttpClientModule,CommonModule,FormsModule,RouterLink],
})
export class OrderStatusComponent implements OnInit {
  tokenId!: number;
  tokenData!: TokenResponse;
  apiUrl = 'https://localhost:7023/api/Token';

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.tokenId = Number(this.route.snapshot.paramMap.get('tokenId'));
    this.getOrderStatus();
  }

  getOrderStatus(): void {
    this.http.get<TokenResponse>(`${this.apiUrl}/${this.tokenId}`).subscribe(
      (response) => {
        this.tokenData = response;
      },
      (error) => {
        console.error('Error fetching order status:', error);
      }
    );
  }

  refreshStatus(): void {
    this.getOrderStatus();
  }



//   goBackTocategorySelection() {

//     this.router.navigate(['/categorySelection']); // ✅ Navigate to categories page

//   }

goBack() {
  this.router.navigate(['/landing']); // ✅ Navigate to landing page
}

}