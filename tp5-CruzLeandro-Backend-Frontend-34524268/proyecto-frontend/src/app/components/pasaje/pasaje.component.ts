import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pasaje } from 'src/app/models/pasaje';
import { PasajeService } from 'src/app/services/pasaje.service';

@Component({
  selector: 'app-pasaje',
  templateUrl: './pasaje.component.html',
  styleUrls: ['./pasaje.component.css']
})
export class PasajeComponent implements OnInit {

  pasaje!: Pasaje;
  pasajes!: Array <Pasaje>;
  cat : any[] =[
    {id:'m',name: 'Menor'},
    {id:'j',name: 'Jubilado'},
    {id:'a',name: 'Adulto'},
  ];
  cate: string = '';

  constructor(private pasajesService : PasajeService,private router : Router) {
    this.mostrarPasajes();
  }

  mostrarPasajes(){
    this.pasajesService.traerPasajes().subscribe(
      (result)=>{
        console.log(result);        
        this.pasajes = result;
      }
    )
  }

  filtrar(){
    console.log('filtrar' + this.cate);
    this.obtenerPorCategoria();
  }

  mostrarTodo(){
    this.mostrarPasajes();
    this.limpiarFiltro();
  }
  limpiarFiltro(){
    this.cate='';
  }
  obtenerPorCategoria() {
    this.pasajesService.pasajeCategoria(this.cate).subscribe(
      (resp) => {
      this.pasajes = resp;
      console.log('categoria '+this.cate+':' +this.pasajes);
      console.log(resp);
    });
  }

  eliminarPasaje(id: string) {
    this.pasajesService.elimPasaje(id).subscribe((resp: any) => {
      console.log(resp);
      this.mostrarPasajes();
    });
  }

  editar(id: string) {
    this.router.navigate(['pasaje-form', id]);
  }

  ngOnInit(): void {
    this.mostrarPasajes();
  }

}
