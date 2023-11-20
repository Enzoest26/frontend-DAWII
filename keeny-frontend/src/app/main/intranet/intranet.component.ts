import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar/sidebar.service';
import { Router } from '@angular/router';

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

  constructor(private sidebarService: SidebarService, private router: Router )
  {
  }
  esconderSideBar()
  {
    this.opened = !this.opened;
    this.sidebarService.obtenerStatusSidebar(this.opened);
  }
  cerrarSesion()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.router.navigate(["login"]);
  }

}
