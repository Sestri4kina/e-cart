import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  burgerMenuPath = "/assets/images/menu_mob.svg";

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public openLink(e: MouseEvent, linkUrl: string) {
    e.preventDefault();
    this.isSidebarOpen = false;
    this.router.navigateByUrl(linkUrl);
  }
}
