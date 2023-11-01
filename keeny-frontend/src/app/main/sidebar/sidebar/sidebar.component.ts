import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarExpanded = true;

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
