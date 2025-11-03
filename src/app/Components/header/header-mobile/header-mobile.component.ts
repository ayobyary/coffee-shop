import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.css'
})
export class HeaderMobileComponent implements AfterViewInit {
  @ViewChild('navElement') navElement?: ElementRef<HTMLElement>;
  @ViewChild('navLeftElement') navLeftElement?: ElementRef<HTMLElement>;
  @ViewChild('overlayElement') overlayElement?: ElementRef<HTMLElement>;
  
  isNavOpen = false;
  isNavLeftOpen = false;

  ngAfterViewInit(): void {
    // Setup event listeners after view is initialized
    this.setupEventListeners();
  }

  openNav(): void {
    this.isNavOpen = true;
    const nav = this.navElement?.nativeElement;
    const overlay = this.overlayElement?.nativeElement;
    
    if (nav) {
      nav.style.transform = "translateX(0)";
    }
    if (overlay) {
      overlay.classList.remove("hidden");
    }
  }

  closeNav(): void {
    this.isNavOpen = false;
    const nav = this.navElement?.nativeElement;
    const overlay = this.overlayElement?.nativeElement;
    
    if (nav) {
      nav.style.transform = "translateX(100%)";
    }
    if (overlay) {
      overlay.classList.add("hidden");
    }
  }

  openNavLeft(): void {
    this.isNavLeftOpen = true;
    const navLeft = this.navLeftElement?.nativeElement;
    const overlay = this.overlayElement?.nativeElement;
    
    if (navLeft) {
      navLeft.style.transform = "translateX(0)";
    }
    if (overlay) {
      overlay.classList.remove("hidden");
    }
  }

  closeNavLeft(): void {
    this.isNavLeftOpen = false;
    const navLeft = this.navLeftElement?.nativeElement;
    const overlay = this.overlayElement?.nativeElement;
    
    if (navLeft) {
      navLeft.style.transform = "translateX(-100%)";
    }
    if (overlay) {
      overlay.classList.add("hidden");
    }
  }

  onOverlayClick(): void {
    this.closeNav();
    this.closeNavLeft();
  }

  private setupEventListeners(): void {
    // Setup overlay click if it exists
    const overlay = this.overlayElement?.nativeElement;
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.onOverlayClick();
      });
    }
  }
}
