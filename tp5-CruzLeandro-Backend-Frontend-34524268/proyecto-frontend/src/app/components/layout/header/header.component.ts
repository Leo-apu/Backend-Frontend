import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  buscar: boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  busqueda(){
    this.buscar= true;
  }

  salir(){
    this.buscar=false;
  }

}
