import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public opened : Boolean = true;
  constructor() { 
  }

  obtenerStatusSidebar(open: Boolean)
  {
    this.opened = open;
  }

}
