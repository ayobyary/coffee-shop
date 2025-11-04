import { Routes } from '@angular/router';
import { AllComponent } from './Components/all/all.component';
import { HomeComponent } from './Navbar page/home/home.component';
import { ShopeComponent } from './Navbar page/shope/shope.component';
import { DicshitnaryComponent } from './Navbar page/dicshitnary/dicshitnary.component';
import { AboutUsComponent } from './Navbar page/about-us/about-us.component';
import { BlogComponent } from './Navbar page/blog/blog.component';
import { ContactUsComponent } from './Navbar page/contact-us/contact-us.component';

export const routes: Routes = [
    {
        path: '',
        component: AllComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'shope', component: ShopeComponent },
            { path: 'dicshitnary', component: DicshitnaryComponent },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'contact-us', component: ContactUsComponent },
        ]
    },
    { path: '**', redirectTo: 'home' }
];
