import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { CategoryBannerComponent } from '../category-banner/category-banner.component';
import { ProductsCategoryComponent } from '../products-category/products-category.component';
import { BestSellComponent } from '../best-sell/best-sell.component';
import { CoffeeClubComponent } from '../coffee-club/coffee-club.component';
import { NewProductsComponent } from '../new-products/new-products.component';
import { BlogsComponent } from '../blogs/blogs.component';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { ServicesComponent } from "../services/services.component";
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../../Navbar page/home/home.component";
Swiper.use([Navigation]);
@Component({
  selector: 'app-all',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, CategoryBannerComponent, ProductsCategoryComponent, BestSellComponent, CoffeeClubComponent, NewProductsComponent, BlogsComponent, ContactUsComponent, ServicesComponent, FooterComponent, HomeComponent, RouterModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  ngAfterViewInit(): void {
    new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next-costom',
        prevEl: '.swiper-button-prev-costom',
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 14,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      }
    });
  }
}
