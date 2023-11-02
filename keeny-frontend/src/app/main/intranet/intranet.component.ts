import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar/sidebar.service';

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.css']
})
export class IntranetComponent implements OnInit{
  events: string[] = [];
  opened: boolean = true;

  ngOnInit(): void {
    console.log("Estoy Aqui")
  }

  constructor(private sidebarService: SidebarService )
  {
  }
  esconderSideBar()
  {
    this.opened = !this.opened;
    this.sidebarService.obtenerStatusSidebar(this.opened);
  }

}
