import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, map, combineLatest, Subject, takeUntil } from 'rxjs';

interface Blog {
  id: number;
  title: string;
  image: string;
  date: { day: number; month: string; year: number };
  category: string;
  excerpt: string;
  author: string;
  views?: number;
  comments?: number;
  createdAt: number; // timestamp for sorting
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [
    { id: 1, title: 'طرز تهیه قهوه دمی با دستگاه اروپرس خط دوم اسم طولانی', image: 'assets/images/blogs/blog-1.png', date: { day: 21, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'آموزش کامل طرز تهیه قهوه دمی با دستگاه اروپرس', author: 'مدیریت', createdAt: 1692000000 },
    { id: 2, title: 'طرز تهیه قهوه دمی با دستگاه اروپرس خط دوم اسم طولانی', image: 'assets/images/blogs/blog-2.png', date: { day: 20, month: 'مرداد', year: 1402 }, category: 'معرفی محصول', excerpt: 'معرفی بهترین دستگاه‌های اروپرس', author: 'مدیریت', createdAt: 1691913600 },
    { id: 3, title: 'طرز تهیه یک فنجان کافه زینو برزیلی', image: 'assets/images/blogs/blog-3.png', date: { day: 19, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'راهنمای کامل تهیه قهوه زینو برزیلی', author: 'مدیریت', createdAt: 1691827200 },
    { id: 4, title: 'طرز تهیه قهوه دالگونا مناسب روز‌های کرونایی', image: 'assets/images/blogs/blog-4.png', date: { day: 18, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'آموزش طرز تهیه قهوه دالگونا', author: 'مدیریت', createdAt: 1691740800 },
    { id: 5, title: 'بهترین نوع قهوه برای شروع روز', image: 'assets/images/blogs/blog-1.png', date: { day: 17, month: 'مرداد', year: 1402 }, category: 'اخبار', excerpt: 'معرفی بهترین نوع قهوه برای صبحانه', author: 'مدیریت', createdAt: 1691654400 },
    { id: 6, title: 'معرفی دستگاه‌های قهوه ساز برتر', image: 'assets/images/blogs/blog-2.png', date: { day: 16, month: 'مرداد', year: 1402 }, category: 'معرفی محصول', excerpt: 'بررسی دستگاه‌های قهوه ساز محبوب', author: 'مدیریت', createdAt: 1691568000 },
    { id: 7, title: 'تاریخچه قهوه در ایران', image: 'assets/images/blogs/blog-3.png', date: { day: 15, month: 'مرداد', year: 1402 }, category: 'اخبار', excerpt: 'داستان ورود قهوه به ایران', author: 'مدیریت', createdAt: 1691481600 },
    { id: 8, title: 'نحوه نگهداری قهوه تازه', image: 'assets/images/blogs/blog-4.png', date: { day: 14, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'راهنمای نگهداری صحیح قهوه', author: 'مدیریت', createdAt: 1691395200 },
    { id: 9, title: 'قهوه اسپرسو چیست و چگونه تهیه می‌شود', image: 'assets/images/blogs/blog-1.png', date: { day: 13, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'آموزش کامل تهیه قهوه اسپرسو', author: 'مدیریت', createdAt: 1691308800 },
    { id: 10, title: 'معرفی قهوه‌های ویژه برزیلی', image: 'assets/images/blogs/blog-2.png', date: { day: 12, month: 'مرداد', year: 1402 }, category: 'معرفی محصول', excerpt: 'آشنایی با قهوه‌های ویژه برزیل', author: 'مدیریت', createdAt: 1691222400 },
    { id: 11, title: 'فواید نوشیدن قهوه برای سلامت', image: 'assets/images/blogs/blog-3.png', date: { day: 11, month: 'مرداد', year: 1402 }, category: 'اخبار', excerpt: 'بررسی فواید و مضرات قهوه', author: 'مدیریت', createdAt: 1691136000 },
    { id: 12, title: 'طرز تهیه قهوه ترک اصل', image: 'assets/images/blogs/blog-4.png', date: { day: 10, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'آموزش طرز تهیه قهوه ترک', author: 'مدیریت', createdAt: 1691049600 },
    { id: 13, title: 'بهترین زمان نوشیدن قهوه', image: 'assets/images/blogs/blog-1.png', date: { day: 9, month: 'مرداد', year: 1402 }, category: 'اخبار', excerpt: 'زمان مناسب برای نوشیدن قهوه', author: 'مدیریت', createdAt: 1690963200 },
    { id: 14, title: 'معرفی قهوه کلمبیا', image: 'assets/images/blogs/blog-2.png', date: { day: 8, month: 'مرداد', year: 1402 }, category: 'معرفی محصول', excerpt: 'آشنایی با قهوه‌های کلمبیا', author: 'مدیریت', createdAt: 1690876800 },
    { id: 15, title: 'تفاوت قهوه عربیکا و روبوستا', image: 'assets/images/blogs/blog-3.png', date: { day: 7, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'بررسی تفاوت‌های قهوه عربیکا و روبوستا', author: 'مدیریت', createdAt: 1690790400 },
    { id: 16, title: 'قهوه سرد یا آیس کافی', image: 'assets/images/blogs/blog-4.png', date: { day: 6, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'طرز تهیه قهوه سرد', author: 'مدیریت', createdAt: 1690704000 },
    { id: 17, title: 'معرفی کپسول‌های قهوه نسپرسو', image: 'assets/images/blogs/blog-1.png', date: { day: 5, month: 'مرداد', year: 1402 }, category: 'معرفی محصول', excerpt: 'بررسی کپسول‌های قهوه', author: 'مدیریت', createdAt: 1690617600 },
    { id: 18, title: 'قهوه و کاهش وزن', image: 'assets/images/blogs/blog-2.png', date: { day: 4, month: 'مرداد', year: 1402 }, category: 'اخبار', excerpt: 'نقش قهوه در کاهش وزن', author: 'مدیریت', createdAt: 1690531200 },
    { id: 19, title: 'طرز تهیه قهوه فرانسه', image: 'assets/images/blogs/blog-3.png', date: { day: 3, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'آموزش طرز تهیه قهوه فرانسه', author: 'مدیریت', createdAt: 1690444800 },
    { id: 20, title: 'بهترین قهوه برای مبتدیان', image: 'assets/images/blogs/blog-4.png', date: { day: 2, month: 'مرداد', year: 1402 }, category: 'آموزشی', excerpt: 'راهنمای انتخاب قهوه برای مبتدیان', author: 'مدیریت', createdAt: 1690358400 },
    { id: 21, title: 'قهوه و ورزش', image: 'assets/images/blogs/blog-1.png', date: { day: 1, month: 'مرداد', year: 1402 }, category: 'اخبار', excerpt: 'تأثیر قهوه بر عملکرد ورزشی', author: 'مدیریت', createdAt: 1690272000 },
    { id: 22, title: 'معرفی قهوه اتیوپی', image: 'assets/images/blogs/blog-2.png', date: { day: 31, month: 'تیر', year: 1402 }, category: 'معرفی محصول', excerpt: 'آشنایی با قهوه‌های اتیوپی', author: 'مدیریت', createdAt: 1690185600 },
    { id: 23, title: 'طرز تهیه قهوه با فیلتر', image: 'assets/images/blogs/blog-3.png', date: { day: 30, month: 'تیر', year: 1402 }, category: 'آموزشی', excerpt: 'آموزش استفاده از فیلتر قهوه', author: 'مدیریت', createdAt: 1690099200 },
    { id: 24, title: 'قهوه و خلاقیت', image: 'assets/images/blogs/blog-4.png', date: { day: 29, month: 'تیر', year: 1402 }, category: 'اخبار', excerpt: 'تأثیر قهوه بر افزایش خلاقیت', author: 'مدیریت', createdAt: 1690012800 },
  ];

  categories = ['همه', 'آموزشی', 'معرفی محصول', 'اخبار'];
  
  query: string = '';
  selectedCategory: string = 'همه';
  sortBy: string = 'newest';
  page: number = 1;
  pageSize: number = 12;
  total: number = 0;
  totalPages: number = 0;
  pageItems: Blog[] = [];

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    combineLatest([
      this.route.queryParams.pipe(startWith({})),
      this.createFilterStream()
    ]).pipe(
      takeUntil(this.destroy$),
      map(([queryParams, filteredBlogs]) => {
        this.updateStateFromQueryParams(queryParams);
        return this.applyPagination(filteredBlogs);
      })
    ).subscribe(paginatedBlogs => {
      this.pageItems = paginatedBlogs;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createFilterStream() {
    return combineLatest([
      this.createStream(this.getSearchQuery.bind(this), 'q'),
      this.createStream(this.getSelectedCategory.bind(this), 'cat'),
      this.createStream(this.getSortBy.bind(this), 'sort'),
      this.createStream(this.getPage.bind(this), 'page'),
      this.createStream(this.getPageSize.bind(this), 'size')
    ]).pipe(
      debounceTime(100),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      map(() => this.applyFiltersAndSort())
    );
  }

  private createStream<T>(selector: () => T, paramName: string) {
    return this.route.queryParams.pipe(
      map(params => params[paramName] || selector()),
      startWith(selector())
    );
  }

  private getSearchQuery() { return this.query; }
  private getSelectedCategory() { return this.selectedCategory; }
  private getSortBy() { return this.sortBy; }
  private getPage() { return this.page; }
  private getPageSize() { return this.pageSize; }

  private updateStateFromQueryParams(params: any): void {
    this.query = params['q'] || '';
    this.selectedCategory = params['cat'] || 'همه';
    this.sortBy = params['sort'] || 'newest';
    this.page = params['page'] ? +params['page'] : 1;
    this.pageSize = params['size'] ? +params['size'] : 12;
  }

  private applyFiltersAndSort(): Blog[] {
    let filtered = [...this.blogs];

    // Apply search query
    if (this.query) {
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(this.query.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(this.query.toLowerCase())
      );
    }

    // Apply category filter
    if (this.selectedCategory && this.selectedCategory !== 'همه') {
      filtered = filtered.filter(b => b.category === this.selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (this.sortBy === 'oldest') {
        return a.createdAt - b.createdAt;
      } else if (this.sortBy === 'popular') {
        return (b.views || 0) - (a.views || 0);
      } else if (this.sortBy === 'newest') {
        return b.createdAt - a.createdAt;
      }
      return 0;
    });

    this.total = filtered.length;
    this.totalPages = Math.ceil(this.total / this.pageSize);
    if (this.page > this.totalPages && this.totalPages > 0) {
      this.page = this.totalPages;
    } else if (this.totalPages === 0) {
      this.page = 1;
    }

    this.updateQueryParams();
    return filtered;
  }

  private applyPagination(filteredBlogs: Blog[]): Blog[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return filteredBlogs.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.updateQueryParams();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.query || null,
        cat: this.selectedCategory === 'همه' ? null : this.selectedCategory,
        sort: this.sortBy === 'newest' ? null : this.sortBy,
        page: this.page === 1 ? null : this.page,
        size: this.pageSize === 12 ? null : this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }
}
