import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
Swiper.use([Navigation]);
@Component({
  selector: 'app-all',
  standalone: true,
  imports: [],
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
