import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';



@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  libros : Array <Libro>=[];
  indice: number=0;
  libro! : Libro;
  
  constructor(private libroService : LibroService) { 
    
    
  }


  iniciar(){
    this.libro = this.libros[0]
  }

  avanzar(){
    if (this.indice != this.libros.length-1) {
      this.indice=this.indice+1;
      this.libro = this.libros[this.indice]
    }
  }
  retroceder(){
    if (this.indice != 0) {
      this.indice=this.indice-1;
      this.libro = this.libros[this.indice]
    }
  }

  ngOnInit(): void {
    this.libros = new Array <Libro>();
    this.libroService.mostrarDestacados().subscribe(
      (resp)=> {
        console.log(resp);
        this.libros = resp;
        console.log(this.libros);
        this.iniciar();
      },
      (error)=> {console.log(error)}
    )
  }
}
