import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith, map, combineLatest, Subject, takeUntil } from 'rxjs';

interface DictionaryTerm {
  id: number;
  word: string;
  englishWord?: string;
  meaning: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-dicshitnary',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dicshitnary.component.html',
  styleUrl: './dicshitnary.component.css'
})
export class DicshitnaryComponent implements OnInit, OnDestroy {
  terms: DictionaryTerm[] = [
    { id: 1, word: 'اسپرسو', englishWord: 'Espresso', meaning: 'نوعی قهوه غلیظ و قوی', description: 'اسپرسو یک نوع قهوه ایتالیایی است که با عبور آب داغ تحت فشار از دانه‌های قهوه آسیاب شده تهیه می‌شود. این قهوه بسیار غلیظ و قوی است و پایه بسیاری از نوشیدنی‌های قهوه محسوب می‌شود.', category: 'انواع قهوه' },
    { id: 2, word: 'کاپوچینو', englishWord: 'Cappuccino', meaning: 'قهوه اسپرسو با شیر کف‌دار', description: 'کاپوچینو ترکیبی از اسپرسو، شیر بخارزده و کف شیر است. معمولاً به نسبت مساوی تهیه می‌شود و روی آن پودر کاکائو می‌ریزند.', category: 'انواع قهوه' },
    { id: 3, word: 'لاته', englishWord: 'Latte', meaning: 'اسپرسو با شیر بخارزده', description: 'لاته یک نوشیدنی قهوه است که از اسپرسو و مقدار زیادی شیر بخارزده تشکیل شده است. معمولاً روی آن طرح‌های لاته آرت کشیده می‌شود.', category: 'انواع قهوه' },
    { id: 4, word: 'آمریکانو', englishWord: 'Americano', meaning: 'اسپرسو رقیق شده با آب داغ', description: 'آمریکانو از اضافه کردن آب داغ به یک یا دو شات اسپرسو تهیه می‌شود. طعمی مشابه قهوه فیلتر دارد اما از اسپرسو تهیه شده است.', category: 'انواع قهوه' },
    { id: 5, word: 'ماکیاتو', englishWord: 'Macchiato', meaning: 'اسپرسو با یک نقطه شیر', description: 'ماکیاتو در زبان ایتالیایی به معنای "لکه‌دار" است. این نوشیدنی یک شات اسپرسو است که با یک لکه کوچک کف شیر تزئین می‌شود.', category: 'انواع قهوه' },
    { id: 6, word: 'عربیکا', englishWord: 'Arabica', meaning: 'گونه اصلی قهوه', description: 'عربیکا یکی از دو گونه اصلی قهوه است. طعم ملایم‌تر و عطر بهتری نسبت به روبوستا دارد و حدود 70% تولید جهانی قهوه را تشکیل می‌دهد.', category: 'انواع دانه' },
    { id: 7, word: 'روبوستا', englishWord: 'Robusta', meaning: 'گونه مقاوم قهوه', description: 'روبوستا گونه دوم قهوه است که مقاوم‌تر و قوی‌تر از عربیکا است. کافئین بیشتری دارد و طعم تلخ‌تری دارد. معمولاً در قهوه‌های فوری استفاده می‌شود.', category: 'انواع دانه' },
    { id: 8, word: 'رست', englishWord: 'Roast', meaning: 'فرآیند برشته کردن دانه قهوه', description: 'رست فرآیند گرم کردن دانه‌های قهوه سبز است تا به رنگ قهوه‌ای درآیند و طعم و عطر مطلوب پیدا کنند. انواع مختلف رست وجود دارد: لایت، مدیوم، دارک.', category: 'فرآیند' },
    { id: 9, word: 'رست لایت', englishWord: 'Light Roast', meaning: 'رست روشن', description: 'رست لایت دانه‌هایی با رنگ روشن و طعم ملایم تولید می‌کند. اسیدیته بالا و کافئین بیشتری دارد. طعم اصلی دانه بیشتر حفظ می‌شود.', category: 'فرآیند' },
    { id: 10, word: 'رست دارک', englishWord: 'Dark Roast', meaning: 'رست تیره', description: 'رست دارک دانه‌هایی با رنگ تیره و طعم قوی و تلخ تولید می‌کند. اسیدیته کم و کافئین کمتر دارد. طعم دودی و کاراملی دارد.', category: 'فرآیند' },
    { id: 11, word: 'گرایندر', englishWord: 'Grinder', meaning: 'آسیاب قهوه', description: 'گرایندر دستگاهی است برای آسیاب کردن دانه‌های قهوه. دو نوع اصلی دارد: تیغه‌ای و بور. گرایندر بور کیفیت بهتری دارد.', category: 'تجهیزات' },
    { id: 12, word: 'تمپر', englishWord: 'Tamper', meaning: 'فشرده‌کننده پودر قهوه', description: 'تمپر وسیله‌ای است برای فشرده کردن پودر قهوه در پورتافیلتر دستگاه اسپرسو. فشردگی صحیح برای تهیه اسپرسوی خوب ضروری است.', category: 'تجهیزات' },
    { id: 13, word: 'پورتافیلتر', englishWord: 'Portafilter', meaning: 'فیلتر نگهدارنده قهوه', description: 'پورتافیلتر قسمت قابل جدا شدن دستگاه اسپرسو است که پودر قهوه در آن قرار می‌گیرد و به دستگاه متصل می‌شود.', category: 'تجهیزات' },
    { id: 14, word: 'اروپرس', englishWord: 'AeroPress', meaning: 'دستگاه قهوه دمی', description: 'اروپرس یک روش ساده و سریع برای تهیه قهوه است. از فشار هوا برای استخراج قهوه استفاده می‌کند و قهوه‌ای صاف و خالص تولید می‌کند.', category: 'تجهیزات' },
    { id: 15, word: 'وی۶۰', englishWord: 'V60', meaning: 'دستگاه قهوه دمی مخروطی', description: 'وی۶۰ یک نوع درپوش فیلتر مخروطی شکل است که توسط شرکت هاریو ساخته شده است. قهوه‌ای با طعم تمیز و روشن تولید می‌کند.', category: 'تجهیزات' },
    { id: 16, word: 'فرنچ پرس', englishWord: 'French Press', meaning: 'قوری قهوه فشاری', description: 'فرنچ پرس یک روش ساده برای تهیه قهوه است. قهوه و آب داغ در مخزن مخلوط می‌شوند و سپس با فشار یک صفحه، تفاله قهوه جدا می‌شود.', category: 'تجهیزات' },
    { id: 17, word: 'کرمه', englishWord: 'Crema', meaning: 'کف طلایی روی اسپرسو', description: 'کرمه لایه طلایی-قهوه‌ای کف‌مانندی است که روی یک شات اسپرسوی خوب تشکیل می‌شود. نشان‌دهنده کیفیت خوب اسپرسو است.', category: 'ویژگی‌ها' },
    { id: 18, word: 'بادی', englishWord: 'Body', meaning: 'غنا و وزن قهوه در دهان', description: 'بادی به احساس وزن و غنای قهوه در دهان اشاره دارد. قهوه می‌تواند بدن سبک، متوسط یا سنگین داشته باشد.', category: 'ویژگی‌ها' },
    { id: 19, word: 'آسیدیته', englishWord: 'Acidity', meaning: 'اسیدیته قهوه', description: 'آسیدیته به طعم تیز و روشن قهوه اشاره دارد. یک ویژگی مثبت در قهوه است و نباید با تلخی اشتباه گرفته شود.', category: 'ویژگی‌ها' },
    { id: 20, word: 'عطر', englishWord: 'Aroma', meaning: 'بوی قهوه', description: 'عطر به بوی قهوه قبل از نوشیدن اشاره دارد. عطر خوب نشان‌دهنده کیفیت دانه و رست مناسب است.', category: 'ویژگی‌ها' },
    { id: 21, word: 'کافئین', englishWord: 'Caffeine', meaning: 'ماده محرک موجود در قهوه', description: 'کافئین یک ماده شیمیایی طبیعی است که در دانه‌های قهوه یافت می‌شود و باعث افزایش انرژی و هوشیاری می‌شود.', category: 'ویژگی‌ها' },
    { id: 22, word: 'دم‌آوری', meaning: 'فرآیند تهیه قهوه', description: 'دم‌آوری به روش‌های مختلف تهیه قهوه اشاره دارد که شامل استخراج طعم و عطر از دانه‌های قهوه است.', category: 'فرآیند' },
    { id: 23, word: 'اکستکشن', englishWord: 'Extraction', meaning: 'استخراج طعم از قهوه', description: 'اکستکشن فرآیند استخراج طعم‌ها، عطرها و ترکیبات از دانه‌های قهوه با استفاده از آب است.', category: 'فرآیند' },
    { id: 24, word: 'اوراکستکشن', englishWord: 'Over-extraction', meaning: 'استخراج بیش از حد', description: 'اوراکستکشن زمانی رخ می‌دهد که قهوه بیش از حد استخراج شود و طعم تلخ و نامطلوب پیدا کند.', category: 'فرآیند' },
    { id: 25, word: 'آندراکستکشن', englishWord: 'Under-extraction', meaning: 'استخراج ناکافی', description: 'آندراکستکشن زمانی رخ می‌دهد که قهوه به اندازه کافی استخراج نشود و طعم ترش و ناتمام داشته باشد.', category: 'فرآیند' },
    { id: 26, word: 'بلوم', englishWord: 'Bloom', meaning: 'فوران اولیه قهوه', description: 'بلوم فرآیند اضافه کردن مقدار کمی آب به پودر قهوه و اجازه دادن به گازها برای خروج است. این مرحله برای قهوه‌های تازه رست شده مهم است.', category: 'فرآیند' },
    { id: 27, word: 'راتیو', englishWord: 'Ratio', meaning: 'نسبت قهوه به آب', description: 'راتیو به نسبت وزن قهوه به وزن آب استفاده شده در تهیه قهوه اشاره دارد. معمولاً به صورت 1:15 یا 1:17 بیان می‌شود.', category: 'فرآیند' },
    { id: 28, word: 'ریستریکتو', englishWord: 'Ristretto', meaning: 'اسپرسوی کوتاه‌تر', description: 'ریستریکتو یک شات اسپرسو است که با آب کمتر و زمان کوتاه‌تر تهیه می‌شود. غلیظ‌تر و قوی‌تر از اسپرسوی معمولی است.', category: 'انواع قهوه' },
    { id: 29, word: 'لونگو', englishWord: 'Lungo', meaning: 'اسپرسوی بلندتر', description: 'لونگو یک شات اسپرسو است که با آب بیشتر و زمان طولانی‌تر تهیه می‌شود. رقیق‌تر از اسپرسوی معمولی است.', category: 'انواع قهوه' },
    { id: 30, word: 'موکا', englishWord: 'Mocha', meaning: 'قهوه با شکلات', description: 'موکا ترکیبی از اسپرسو، شیر بخارزده و شکلات است. نام آن از بندر موکا در یمن گرفته شده که در گذشته مرکز تجارت قهوه بود.', category: 'انواع قهوه' },
    { id: 31, word: 'فلت وایت', englishWord: 'Flat White', meaning: 'اسپرسو با شیر میکروفوم', description: 'فلت وایت یک نوشیدنی استرالیایی است که از اسپرسو و شیر بخارزده (میکروفوم) تهیه می‌شود. شبیه لاته اما با کف کمتر است.', category: 'انواع قهوه' },
    { id: 32, word: 'آفوگاتو', englishWord: 'Affogato', meaning: 'بستنی با اسپرسو', description: 'آفوگاتو یک دسر ایتالیایی است که از یک شات اسپرسو داغ روی بستنی وانیلی تهیه می‌شود.', category: 'انواع قهوه' },
    { id: 33, word: 'کلد برو', englishWord: 'Cold Brew', meaning: 'قهوه سرد دم‌کرده', description: 'کلد برو روشی برای تهیه قهوه است که در آن قهوه برای 12-24 ساعت در آب سرد دم می‌کشد. طعم ملایم‌تر و کافئین بیشتری دارد.', category: 'انواع قهوه' },
    { id: 34, word: 'آیس کافی', englishWord: 'Iced Coffee', meaning: 'قهوه سرد', description: 'آیس کافی قهوه دم‌کرده است که سرد شده و با یخ سرو می‌شود. متفاوت از کلد برو است که در آب سرد دم می‌کشد.', category: 'انواع قهوه' },
    { id: 35, word: 'سیگل اوریجین', englishWord: 'Single Origin', meaning: 'قهوه تک‌منبع', description: 'سیگل اوریجین به قهوه‌ای اشاره دارد که از یک مکان مشخص (مزرعه، منطقه یا کشور) می‌آید. طعم منحصر به فرد آن منطقه را دارد.', category: 'انواع دانه' },
    { id: 36, word: 'بلند', englishWord: 'Blend', meaning: 'ترکیب قهوه', description: 'بلند ترکیبی از دانه‌های قهوه از مناطق مختلف است که برای ایجاد طعم متعادل و سازگار ترکیب شده‌اند.', category: 'انواع دانه' },
    { id: 37, word: 'سیویل', englishWord: 'Civet', meaning: 'کپی لواک', description: 'سیویت یا کپی لواک یک نوع قهوه گران‌قیمت است که از دانه‌های فرآوری شده توسط حیوان سیویت تهیه می‌شود.', category: 'انواع دانه' },
    { id: 38, word: 'اسپشیالیتی', englishWord: 'Specialty Coffee', meaning: 'قهوه تخصصی', description: 'اسپشیالیتی به قهوه با کیفیت بالا اشاره دارد که امتیاز بالای 80 از 100 را در سیستم امتیازدهی دریافت کرده است.', category: 'انواع دانه' },
    { id: 39, word: 'میکروفوم', englishWord: 'Microfoam', meaning: 'کف شیر ریز', description: 'میکروفوم کف شیر بسیار ریز و صاف است که برای لاته آرت استفاده می‌شود. دارای بافت ابریشمی و درخشش است.', category: 'ویژگی‌ها' },
    { id: 40, word: 'لته  آرت', englishWord: 'Latte Art', meaning: 'هنر طراحی روی لاته', description: 'لته آرت هنر ایجاد طرح‌های تزئینی روی سطح قهوه با استفاده از کف شیر است. طرح‌هایی مانند قلب، گل یا رزولتا.', category: 'ویژگی‌ها' },
  ];

  categories = ['همه', 'انواع قهوه', 'انواع دانه', 'تجهیزات', 'فرآیند', 'ویژگی‌ها'];
  
  // Persian alphabet letters for filtering
  persianLetters = ['آ', 'ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی'];
  
  query: string = '';
  selectedCategory: string = 'همه';
  selectedLetter: string | null = null;
  sortBy: string = 'alphabetical';
  page: number = 1;
  pageSize: number = 20;
  total: number = 0;
  totalPages: number = 0;
  pageItems: DictionaryTerm[] = [];

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    combineLatest([
      this.createStream(this.getSearchQuery.bind(this), 'q'),
      this.createStream(this.getSelectedCategory.bind(this), 'cat'),
      this.createStream(this.getSelectedLetter.bind(this), 'letter'),
      this.createStream(this.getSortBy.bind(this), 'sort'),
      this.createStream(this.getPage.bind(this), 'page'),
      this.createStream(this.getPageSize.bind(this), 'size')
    ]).pipe(
      debounceTime(100),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      takeUntil(this.destroy$),
      map(() => this.applyFiltersAndSort())
    ).subscribe(filteredTerms => {
      this.pageItems = this.applyPagination(filteredTerms);
    });

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.updateStateFromQueryParams(params);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createStream<T>(selector: () => T, paramName: string) {
    return this.route.queryParams.pipe(
      map(params => params[paramName] || selector()),
      startWith(selector())
    );
  }

  private getSearchQuery() { return this.query; }
  private getSelectedCategory() { return this.selectedCategory; }
  private getSelectedLetter() { return this.selectedLetter; }
  private getSortBy() { return this.sortBy; }
  private getPage() { return this.page; }
  private getPageSize() { return this.pageSize; }

  private updateStateFromQueryParams(params: any): void {
    this.query = params['q'] || '';
    this.selectedCategory = params['cat'] || 'همه';
    this.selectedLetter = params['letter'] || null;
    this.sortBy = params['sort'] || 'alphabetical';
    this.page = params['page'] ? +params['page'] : 1;
    this.pageSize = params['size'] ? +params['size'] : 20;
  }

  private applyFiltersAndSort(): DictionaryTerm[] {
    let filtered = [...this.terms];

    // Apply search query
    if (this.query) {
      const q = this.query.toLowerCase();
      filtered = filtered.filter(term => 
        term.word.toLowerCase().includes(q) ||
        (term.englishWord && term.englishWord.toLowerCase().includes(q)) ||
        term.meaning.toLowerCase().includes(q) ||
        term.description.toLowerCase().includes(q)
      );
    }

    // Apply category filter
    if (this.selectedCategory !== 'همه') {
      filtered = filtered.filter(term => term.category === this.selectedCategory);
    }

    // Apply letter filter
    if (this.selectedLetter) {
      filtered = filtered.filter(term => term.word.startsWith(this.selectedLetter!));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (this.sortBy === 'alphabetical') {
        return a.word.localeCompare(b.word, 'fa');
      } else if (this.sortBy === 'category') {
        return a.category.localeCompare(b.category, 'fa');
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

  private applyPagination(filteredTerms: DictionaryTerm[]): DictionaryTerm[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return filteredTerms.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.updateQueryParams();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  selectLetter(letter: string | null): void {
    this.selectedLetter = this.selectedLetter === letter ? null : letter;
    this.page = 1;
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.query || null,
        cat: this.selectedCategory === 'همه' ? null : this.selectedCategory,
        letter: this.selectedLetter || null,
        sort: this.sortBy === 'alphabetical' ? null : this.sortBy,
        page: this.page === 1 ? null : this.page,
        size: this.pageSize === 20 ? null : this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }
}
