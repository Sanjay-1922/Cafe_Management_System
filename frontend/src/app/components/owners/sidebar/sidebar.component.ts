import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent { 
  salesReportsOpen=false;
  toggleSalesReports(){
    this.salesReportsOpen=!this.salesReportsOpen;
  }
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
  navigateTo(route : string){
    this.router.navigate([route]);
  }
  toggleSidebar(){
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const bacgroundImage = document.getElementsByClassName('owner-home-content')[0];
    if (sidebar) {
      if((sidebar as HTMLElement).style.width === "0px"){
        (sidebar as HTMLElement).style.width = "250px";
        (sidebar as HTMLElement).style.padding = "15px";
        (sidebar as HTMLElement).style.display = "block"
        if(bacgroundImage){
          (bacgroundImage as HTMLElement).style.marginLeft = "250px";
        }
      } else{
        (sidebar as HTMLElement).style.width = "0px";
        (sidebar as HTMLElement).style.padding = "0px";
        (sidebar as HTMLElement).style.display = "none"
        if(bacgroundImage){
          (bacgroundImage as HTMLElement).style.marginLeft = "0px";
        }
      }
    }
  }
}