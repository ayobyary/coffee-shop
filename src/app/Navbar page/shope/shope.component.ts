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
  products: Product[] = [
    { id: 1, title: 'قهوه اسپرسو پریسکا 250 گرمی', price: 175000, image: 'assets/images/products/p2.png', category: 'اسپرسو', rating: 4.6, inStock: true, createdAt: 20241012 },
    { id: 2, title: 'قهوه ویژه گواتمالا 250 گرمی', price: 245000, image: 'assets/images/products/p1.png', category: 'قهوه ویژه', rating: 4.8, inStock: true, createdAt: 20241018 },
    { id: 3, title: 'کپسول قهوه عربیکا 10 عدد', price: 320000, image: 'assets/images/products/p3.png', category: 'کپسول', rating: 4.1, inStock: false, createdAt: 20240930 },
    { id: 4, title: 'ترکیب تجاری کلاسیک 500 گرمی', price: 210000, image: 'assets/images/products/p4.png', category: 'تجاری', rating: 4.0, inStock: true, createdAt: 20241005 },
    { id: 5, title: 'قهوه ترکیبی ویژه 250 گرمی', price: 195000, image: 'assets/images/products/p5.png', category: 'ترکیبی', rating: 4.3, inStock: true, createdAt: 20240918 },
    { id: 6, title: 'قهوه ویژه اتیوپی 250 گرمی', price: 265000, image: 'assets/images/products/p6.png', category: 'قهوه ویژه', rating: 4.9, inStock: true, createdAt: 20241020 },
    { id: 7, title: 'کپسول قهوه روبوستا 10 عدد', price: 285000, image: 'assets/images/products/p7.png', category: 'کپسول', rating: 3.9, inStock: true, createdAt: 20240815 },
    { id: 8, title: 'قهوه اسپرسو ایتالیانو 250 گرمی', price: 185000, image: 'assets/images/products/p8.png', category: 'اسپرسو', rating: 4.2, inStock: true, createdAt: 20241001 },
  ];

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
