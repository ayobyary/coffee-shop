import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [RouterModule],
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

  toggleSubmenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const buttonElement = (event.currentTarget as HTMLElement) || (event.target as HTMLElement);
    if (!buttonElement) return;

    const headerRow = buttonElement.closest('div');
    const submenuElement = headerRow?.nextElementSibling as HTMLElement | null;

    if (headerRow) {
      headerRow.classList.toggle('text-orange-300');
    }
    buttonElement.classList.toggle('rotate-180');

    if (submenuElement) {
      submenuElement.classList.toggle('submenu-open');
    }
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
