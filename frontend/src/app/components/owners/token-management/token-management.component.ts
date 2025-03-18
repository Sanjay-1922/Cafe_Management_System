import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-token-management',
  templateUrl: './token-management.component.html',
  styleUrls: ['./token-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule,SidebarComponent]
})
export class TokenManagementComponent {
  tokens: any[] = [];
  http = inject(HttpClient);
  router = inject(Router);

  constructor() {
    this.getTokens();
  }

  // ✅ Fetch All Tokens
  getTokens() {
    const headers = this.getHeaders();
    this.http.get('https://localhost:7023/api/Token', { headers }).subscribe(
      (res: any) => {
        this.tokens = res.map((token: any) => ({
          tokenId: token.tokenId || token.id, // Ensure tokenId is set
          orderId: token.orderId,
          status: token.status,
          createdAt: token.createdAt
        }));
        console.log('Fetched Tokens:', this.tokens); // ✅ Debugging Output
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching tokens:', error);
        alert('Failed to fetch tokens!');
      }
    );
  }

  // ✅ Update Token Status
  updateTokenStatus(token: any) {
    if (!token || !token.tokenId) {
      console.error('Error: tokenId is undefined!', token);
      alert('Error: Cannot update token status. Token ID is missing!');
      return;
    }

    const id = token.tokenId; // ✅ Ensure correct ID
    const headers = this.getHeaders();
    const body = { status: 'Ready' }; // ✅ Correct format

    console.log(`Updating token ID: ${id}`); // ✅ Debugging Output

    this.http.put(`https://localhost:7023/api/Token/${id}`, body, { headers })
      .subscribe(
        () => {
          alert('Token status updated to Ready!');
          this.tokens = this.tokens.map(t =>
            t.tokenId === id ? { ...t, status: 'Ready' } : t
          );
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating token:', error);
          alert('Failed to update token status!');
        }
      );
  }

  // ✅ Delete Token
  deleteToken(tokenId: number) {
    const headers = this.getHeaders();
    this.http.delete(`https://localhost:7023/api/Token/${tokenId}`, { headers }).subscribe(
      () => {
        alert('Token deleted successfully!');
        this.tokens = this.tokens.filter(token => token.tokenId !== tokenId);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting token:', error);
        alert('Failed to delete token!');
      }
    );
  }

  // ✅ Get Headers with Authorization
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNhbmpheSIsInJvbGUiOiJPd25lciIsIlVzZXJJZCI6IjIiLCJuYmYiOjE3NDIxOTExNjQsImV4cCI6MTc0MjI3NzU2NCwiaWF0IjoxNzQyMTkxMTY0LCJpc3MiOiJDYWZlTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkNhZmVNYW5hZ2VtZW50U3lzdGVtVXNlcnMifQ.xhsX89NmuDatOLZC_TOhUsmu_6hnfzElN09APYgzEW0` // Replace with actual token
    });
  }
}
