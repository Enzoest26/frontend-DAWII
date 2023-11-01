import { Component, OnInit } from '@angular/core';

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

  constructor()
  {
    console.log("aaa");
  }

}
