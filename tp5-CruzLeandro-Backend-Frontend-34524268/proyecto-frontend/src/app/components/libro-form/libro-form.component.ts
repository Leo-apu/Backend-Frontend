import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';


@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css']
})
export class LibroFormComponent implements OnInit {

  libro : Libro = new Libro();
  libros! : Array<Libro>;

  constructor(private libroService: LibroService,private router : Router) { }

  
  guardarLibro() {
    console.log(this.libro);
    
    this.libroService.crearLibros(this.libro).subscribe((resp) => {
      console.log(resp);
      alert('Libro Creado');
      this.router.navigate(['/libros']);
    });
  }

  ngOnInit(): void {
  }

}
