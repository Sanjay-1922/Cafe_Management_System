import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {

  id: number;

  name: string;

  price: number;

  image: string;

  quantity: number;

}

@Component({

  selector: 'app-menu',

  templateUrl: './menu.component.html',

  styleUrls: ['./menu.component.css'],

  imports: [CommonModule],

  standalone: true

})

export class MenuComponent implements OnInit {

  categoryId: number | null = null;

  categoryName: string = '';

  menuItems: MenuItem[] = [];

  cart: MenuItem[] = [];

  // Category mapping

  categoryNames: { [key: number]: string } = {

    1: 'Beverages',

    2: 'Desserts',

    3: 'Sandwiches & Wraps',

    4: 'Snacks',

    5: 'Beverages',

    6: 'Breakfast',

    7: 'Salads',

    8: 'Specials'

  };

  // Sample menu items categorized

  menuData: { [key: number]: MenuItem[] } = {

    '1': [ // Beverages
      { id: 101, name: 'WaterMelon', price: 5, image: 'https://tse1.mm.bing.net/th/id/OIP.XRr4dWB5TkVRqszRroTLxgHaGg?rs=1&pid=ImgDetMain', quantity: 0 },
      { id: 102, name: 'Cappichino', price: 6, image: 'https://tse4.mm.bing.net/th/id/OIP.4WUjqZXl4tBdfKEwgN9FKAHaE7?rs=1&pid=ImgDetMain', quantity: 0 },
      { id: 103, name: 'Yogurt', price: 4, image: 'https://www.ketofocus.com/wp-content/uploads/yogurt-fruit-dip-1-768x512.jpg', quantity: 0 },
      { id: 104, name: 'OrangeJuice', price: 6, image: 'https://tse1.mm.bing.net/th/id/OIP.kxzvbAvoWNgLy8mENLyReAHaE8?rs=1&pid=ImgDetMain', quantity: 0 },
      { id: 105, name: 'Apple', price: 5, image: 'https://www.jessicagavin.com/wp-content/uploads/2022/09/how-to-cut-an-apple-28-1025x1536.jpg', quantity: 0 },
      { id: 106, name: 'Green tea', price: 5, image: 'https://www.livingstylebits.com/wp-content/uploads/2017/01/Benefits-about-Green-Teaa.jpg', quantity: 0 }
    ],
    '2': [ // Desserts
      { id: 201, name: 'Chocolate Cake', price: 7, image: 'assets/menu/chocolate-cake.jpg', quantity: 0 },
      { id: 202, name: 'Ice Cream Sundae', price: 8, image: 'assets/menu/icecream.jpg', quantity: 0 },
      { id: 203, name: 'Brownie', price: 5, image: 'assets/menu/brownie.jpg', quantity: 0 },
      { id: 204, name: 'Cheesecake', price: 9, image: 'assets/menu/cheesecake.jpg', quantity: 0 },
      { id: 205, name: 'Muffin', price: 4, image: 'assets/menu/muffin.jpg', quantity: 0 },
      { id: 206, name: 'Donut', price: 3, image: 'assets/menu/donut.jpg', quantity: 0 }
    ],
    '3': [ // Snacks
      { id: 301, name: 'French Fries', price: 4, image: 'assets/menu/fries.jpg', quantity: 1 },
      { id: 302, name: 'Onion Rings', price: 5, image: 'assets/menu/onion-rings.jpg', quantity: 1 },
      { id: 303, name: 'Nachos', price: 6, image: 'assets/menu/nachos.jpg', quantity: 1 },
      { id: 304, name: 'Popcorn', price: 4, image: 'assets/menu/popcorn.jpg', quantity: 1 },
      { id: 305, name: 'Spring Rolls', price: 7, image: 'assets/menu/spring-rolls.jpg', quantity: 1 },
      { id: 306, name: 'Garlic Bread', price: 5, image: 'assets/menu/garlic-bread.jpg', quantity: 1 }
    ],
    '4': [ // Sandwiches
      { id: 401, name: 'Grilled Cheese', price: 6, image: 'assets/menu/grilled-cheese.jpg', quantity: 1 },
      { id: 402, name: 'Club Sandwich', price: 7, image: 'assets/menu/club-sandwich.jpg', quantity: 1 },
      { id: 403, name: 'Chicken Sandwich', price: 8, image: 'assets/menu/chicken-sandwich.jpg', quantity: 1 },
      { id: 404, name: 'Tuna Sandwich', price: 7, image: 'assets/menu/tuna-sandwich.jpg', quantity: 1 },
      { id: 405, name: 'Veggie Sandwich', price: 6, image: 'assets/menu/veggie-sandwich.jpg', quantity: 1 },
      { id: 406, name: 'Egg Sandwich', price: 7, image: 'assets/menu/egg-sandwich.jpg', quantity: 1 }
    ],
    '5': [ // Burgers
      { id: 501, name: 'Cheeseburger', price: 8, image: 'assets/menu/cheeseburger.jpg', quantity: 1 },
      { id: 502, name: 'Veggie Burger', price: 7, image: 'assets/menu/veggie-burger.jpg', quantity: 1 },
      { id: 503, name: 'Chicken Burger', price: 9, image: 'assets/menu/chicken-burger.jpg', quantity: 1 },
      { id: 504, name: 'BBQ Burger', price: 10, image: 'assets/menu/bbq-burger.jpg', quantity: 1 },
      { id: 505, name: 'Fish Burger', price: 9, image: 'assets/menu/fish-burger.jpg', quantity: 1 },
      { id: 506, name: 'Double Patty Burger', price: 12, image: 'assets/menu/double-patty.jpg', quantity: 1 }
    ],
    '6': [ // Pasta
      { id: 601, name: 'Spaghetti', price: 10, image: 'assets/menu/spaghetti.jpg', quantity: 1 },
      { id: 602, name: 'Penne Alfredo', price: 12, image: 'assets/menu/penne-alfredo.jpg', quantity: 1 },
      { id: 603, name: 'Lasagna', price: 14, image: 'assets/menu/lasagna.jpg', quantity: 1 },
      { id: 604, name: 'Mac & Cheese', price: 11, image: 'assets/menu/mac-cheese.jpg', quantity: 1 },
      { id: 605, name: 'Ravioli', price: 13, image: 'assets/menu/ravioli.jpg', quantity: 1 },
      { id: 606, name: 'Pasta Primavera', price: 12, image: 'assets/menu/pasta-primavera.jpg', quantity: 1 }
    ],
    '7': [ // Pizzas
      { id: 701, name: 'Margherita Pizza', price: 12, image: 'assets/menu/margherita.jpg', quantity: 1 },
      { id: 702, name: 'Pepperoni Pizza', price: 14, image: 'assets/menu/pepperoni.jpg', quantity: 1 },
      { id: 703, name: 'BBQ Chicken Pizza', price: 15, image: 'assets/menu/bbq-chicken.jpg', quantity: 1 },
      { id: 704, name: 'Veggie Pizza', price: 13, image: 'assets/menu/veggie-pizza.jpg', quantity: 1 },
      { id: 705, name: 'Cheese Burst Pizza', price: 16, image: 'assets/menu/cheese-burst.jpg', quantity: 1 },
      { id: 706, name: 'Meat Lover\'s Pizza', price: 17, image: 'assets/menu/meat-lovers.jpg', quantity: 1 }
    ],
    '8': [ // Cold Beverages
      { id: 801, name: 'Iced Coffee', price: 5, image: 'assets/menu/iced-coffee.jpg', quantity: 1 },
      { id: 802, name: 'Lemonade', price: 4, image: 'assets/menu/lemonade.jpg', quantity: 1 },
      { id: 803, name: 'Smoothie', price: 6, image: 'assets/menu/smoothie.jpg', quantity: 1 },
      { id: 804, name: 'Cold Brew', price: 5, image: 'assets/menu/cold-brew.jpg', quantity: 1 },
      { id: 805, name: 'Milkshake', price: 6, image: 'assets/menu/milkshake.jpg', quantity: 1 },
      { id: 806, name: 'Iced Tea', price: 4, image: 'assets/menu/iced-tea.jpg', quantity: 1 }
    ]


    // Add remaining 5 categories here...

  };

  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('id'));
      if (this.categoryId && this.categoryNames[this.categoryId]) {
        this.categoryName = this.categoryNames[this.categoryId];
        this.menuItems = this.menuData[this.categoryId] || [];
      } else {
        this.categoryName = 'Unknown Category';
        this.menuItems = [];
      }
    });
  }
  increaseQuantity(item: MenuItem): void {
    item.quantity++;
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...item });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    // item.quantity = 0;
  }
  decreaseQuantity(item: MenuItem): void {
    if (item.quantity > 0) {
      item.quantity--;
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity -= 1;
      } else {
        this.cart.push({ ...item });
      }
    }
  }
  addToCart(item: MenuItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push({ ...item });
    }
    item.quantity = 0;
  }
  goBack() {
    this.router.navigate(['/categories']);
  }
  // goToCart() {
  //   this.router.navigate(['/cart']);
  // }
  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

} 