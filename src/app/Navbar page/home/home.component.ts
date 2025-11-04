import { Component } from '@angular/core';
import { HeroComponent } from '../../Components/hero/hero.component';
import { NewProductsComponent } from '../../Components/new-products/new-products.component';
import { CategoryBannerComponent } from '../../Components/category-banner/category-banner.component';
import { ProductsCategoryComponent } from '../../Components/products-category/products-category.component';
import { BestSellComponent } from '../../Components/best-sell/best-sell.component';
import { CoffeeClubComponent } from '../../Components/coffee-club/coffee-club.component';
import { BlogsComponent } from '../../Components/blogs/blogs.component';
import { ContactUsComponent } from '../../Components/contact-us/contact-us.component';
import { ServicesComponent } from '../../Components/services/services.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, NewProductsComponent, CategoryBannerComponent, ProductsCategoryComponent, BestSellComponent, CoffeeClubComponent, BlogsComponent, ContactUsComponent, ServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
