import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
interface Category {
  id: number;
  name: string;
  image: string;
}
 
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],

  imports: [CommonModule],

  standalone: true
})
export class CategoryComponent {
  categories = [
 
    { id: 1, name: 'Beverages', image: 'https://potatorolls.com/wp-content/uploads/2020/06/Summer-Food-Drink-Pairing-1280x720.jpg' },
 
    { id: 2, name: 'Desserts', image: 'https://tse1.mm.bing.net/th/id/OIP.g_M2wfB-faEDBiO6ttIlEgHaFi?rs=1&pid=ImgDetMain' },
 
    { id: 3, name: 'Main Course', image: 'https://i.pinimg.com/originals/1e/c9/ac/1ec9ac177f5ae7024ff6ebf46b42e686.png' },
 
    { id: 4, name: 'Snacks', image: 'https://d2dyh47stel7w4.cloudfront.net/Pictures/1024x536/8/9/7/294897_gettyimages1258687192_664658.jpg' },
 
    { id: 5, name: 'Breakfast', image: 'https://1.bp.blogspot.com/-QTZk_t2GgoQ/XnUzkFDEMcI/AAAAAAAAAF4/2ll_XKXUNL4Qfa9q8I2H5P795HrFC0EUgCLcBGAsYHQ/s1600/fruehstueck.jpg' },
 
    { id: 6, name: 'Fast Food', image: 'https://tse3.mm.bing.net/th/id/OIP.HxyyKnW2j56eR3P06WHGSQHaE8?rs=1&pid=ImgDetMain' },
 
    { id: 7, name: 'Healthy', image: 'https://gatheringdreams.com/wp-content/uploads/2021/03/healthy-snack-ideas-2.jpg' },
 
    { id: 8, name: 'Specials', image: 'https://tse3.mm.bing.net/th/id/OIP.JvXsC9w6u_mwaegsSh_hMQHaE8?rs=1&pid=ImgDetMain' }
 
  ];
 
  cart: { id: number; quantity: number }[] = [];
 
  constructor(private router: Router) {}
 
  selectCategory(categoryId: number): void {
    this.router.navigate(['/menu', categoryId]);
  }
 
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
 
  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
  navigateToCart(): void {
    this.router.navigate(['/cart']);
   }
}
 