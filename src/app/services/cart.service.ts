import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  private loadCartFromStorage(): CartItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  private saveCartToStorage(items: CartItem[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(product: { id: number; title: string; image: string; price: number; category?: string }, quantity: number = 1): void {
    const currentItems = this.getCartItems();
    const existingItem = currentItems.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: quantity,
        category: product.category
      });
    }

    this.updateCart(currentItems);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.getCartItems().filter(item => item.productId !== productId);
    this.updateCart(currentItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.getCartItems();
    const item = currentItems.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart(currentItems);
    }
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getTotalItems(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.getCartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }
}
