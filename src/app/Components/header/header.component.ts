import { Component } from '@angular/core';
import { HeaderDesktopComponent } from "./header-desktop/header-desktop.component";
import { HeaderMobileComponent } from "./header-mobile/header-mobile.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [HeaderDesktopComponent, HeaderMobileComponent]
})
export class HeaderComponent {
  
}


