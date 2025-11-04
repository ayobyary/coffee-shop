import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shope',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shope.component.html',
  styleUrl: './shope.component.css'
})
export class ShopeComponent {
  // Query state
  query = '';
  selectedCategory: string | null = null;
  priceMin: number | null = null;
  priceMax: number | null = null;
  onlyInStock = false;
  sortBy: 'newest' | 'priceAsc' | 'priceDesc' | 'popular' = 'newest';
  view: 'grid' | 'list' = 'grid';
  page = 1;
  pageSize = 12;

  // Cart (in-memory)
  cartItems: { productId: number; qty: number }[] = [];

  // Dataset
  categories = ['اسپرسو', 'قهوه ویژه', 'تجاری', 'کپسول', 'ترکیبی'];
  products: Product[] = [];

  get filteredProducts(): Product[] {
    let result = this.products.slice();
    // search
    if (this.query.trim()) {
      const q = this.query.trim();
      result = result.filter(p => p.title.includes(q));
    }
    // category
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }
    // price
    if (this.priceMin != null) result = result.filter(p => p.price >= this.priceMin!);
    if (this.priceMax != null) result = result.filter(p => p.price <= this.priceMax!);
    // stock
    if (this.onlyInStock) result = result.filter(p => p.inStock);
    // sort
    result.sort((a, b) => {
      switch (this.sortBy) {
        case 'priceAsc': return a.price - b.price;
        case 'priceDesc': return b.price - a.price;
        case 'popular': return (b.rating ?? 0) - (a.rating ?? 0);
        case 'newest':
        default: return (b.createdAt ?? 0) - (a.createdAt ?? 0);
      }
    });
    return result;
  }

  get total(): number { return this.filteredProducts.length; }
  get totalPages(): number { return Math.max(1, Math.ceil(this.total / this.pageSize)); }
  get pageItems(): Product[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  goToPage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product: Product): void {
    const item = this.cartItems.find(i => i.productId === product.id);
    if (item) item.qty += 1; else this.cartItems.push({ productId: product.id, qty: 1 });
    // Open left cart sidebar if exists
    const overlay = document.querySelector('.overlay') as HTMLElement | null;
    const navLeft = document.querySelector('.nav-left') as HTMLElement | null;
    if (overlay) overlay.classList.remove('hidden');
    if (navLeft) navLeft.style.transform = 'translateX(0)';
  }

  // Optional: sync URL (can be extended later)
  // In a future step, we could read/write query params here using Router

  constructor() {
    // build 40 mock items based on 8 base images/categories
    const imgs = [1,2,3,4,5,6,7,8].map(i => `assets/images/products/p${i}.png`);
    const cats = ['اسپرسو', 'قهوه ویژه', 'کپسول', 'تجاری', 'ترکیبی'];
    for (let i = 1; i <= 40; i++) {
      const img = imgs[(i-1) % imgs.length];
      const cat = cats[(i-1) % cats.length];
      const basePrice = 150000 + ((i % 8) * 10000);
      this.products.push({
        id: i,
        title: `${cat} آیتم شماره ${i}`,
        price: basePrice,
        image: img,
        category: cat,
        rating: 3 + ((i % 5) * 0.4),
        inStock: (i % 7) !== 0,
        createdAt: 20240000 + (100 + i),
      });
    }
  }
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  createdAt?: number;
  inStock: boolean;
}
