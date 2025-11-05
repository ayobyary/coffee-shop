import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CartService, CartItem } from '../../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  imports: [RouterModule, CommonModule, DecimalPipe],
  templateUrl: './header-desktop.component.html',
  styleUrl: './header-desktop.component.css'
})
export class HeaderDesktopComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;

  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
        this.totalItems = this.cartService.getTotalItems();
        this.totalPrice = this.cartService.getTotalPrice();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
