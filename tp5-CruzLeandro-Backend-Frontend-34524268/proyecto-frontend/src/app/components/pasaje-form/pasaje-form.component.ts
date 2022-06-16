import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje } from 'src/app/models/pasaje';
import { Persona } from 'src/app/models/persona';
import { PasajeService } from 'src/app/services/pasaje.service';

@Component({
  selector: 'app-pasaje-form',
  templateUrl: './pasaje-form.component.html',
  styleUrls: ['./pasaje-form.component.css']
})
export class PasajeFormComponent implements OnInit {

  submitedd:boolean = false;
  titulo= 'Nuevo Pasaje';
  id : string | null;

  cat : any[] =[
    {id:'m',name: 'Menor'},
    {id:'j',name: 'Jubilado'},
    {id:'a',name: 'Adulto'},
  ];
  venta!: Pasaje;
  listaVentas!: Array<Pasaje>;
  persona! : Persona;
  personas! : Array<Persona>;
  accion: string = 'nuevo';
  descuento: number = 0;
  precioActual: number = 0;
  mostrarDescuento:boolean = false;
  menor: number = 0;
  adulto: number = 0;
  jubilado:number = 0;

  constructor(private fb : FormBuilder,private pasajeService : PasajeService,private router : Router
    ,private aRouter: ActivatedRoute) { 
    
    this.empezar();
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
    this.aRouter.params.subscribe((params) => {
      if (!params['id']) {
        this.accion = 'nuevo';
      } else {
        this.accion = 'actualizar';
        this.titulo = 'Modificar Pasaje';
        this.obtenerUnPasaje(params['id']);
      }
    });
  }

  procesarForm(){
    this.submitedd=true;
  }

  mostrarPasajes(){
    this.pasajeService.traerPasajes().subscribe(
      (result)=>{
        console.log(result);
        
        this.listaVentas = result;
      }
    )
  }

  mostrarPersonas(){
    this.pasajeService.traerPersonas().subscribe(
      (resp)=>{
        this.personas = resp;
      }
    );
  }

  empezar() {
    this.personas = [];
    this.venta = new Pasaje();
    this.persona = new Persona();
    this.venta.pasajero = this.persona;
    this.pasajeService.traerPersonas().subscribe((resp: any) => {
      this.personas = resp;
    });
  }

  agregPasaje() {
    this.venta.precioPasaje= this.precioActual;
    console.log(this.venta);
    this.pasajeService.agregarPasaje(this.venta).subscribe((resp) => {
      console.log(resp);
      this.empezar();
      alert('Pasaje Creado');
      this.router.navigate(['/pasaje']);
    });
  }

  obtenerUnPasaje(id: string) {
    this.pasajeService.obtenerPasaje(id).subscribe((resp: any) => {
      this.venta = resp;
    });
  }

  modificarPasaje() {
    this.pasajeService.modifPasaje(this.venta._id, this.venta).subscribe((resp) => {
      console.log(resp);
      this.empezar();
      alert('Pasaje Editado');
      this.router.navigate(['/pasaje']);
    });
  }

  public resulTotal(){ 
  this.menor=0;this.adulto=0; this.jubilado=0;
    for (let index = 0; index < this.listaVentas.length; index++) {
      if (this.listaVentas[index].categoriaPasajero == "m") {
        this.menor= this.menor+1
      }
      if (this.listaVentas[index].categoriaPasajero == "j") {
        this.jubilado= this.jubilado+1
      }
      if (this.listaVentas[index].categoriaPasajero == "a") {
        this.adulto= this.adulto+1
      }
    }
  }

  public limpiarVentas() {
    this.venta = new Pasaje();
  }

  public calcularDescuento() {
    if(this.venta.categoriaPasajero == "m"){
      this.descuento = (this.venta.precioPasaje*25/100);
      this.precioActual = this.venta.precioPasaje - this.descuento;
      this.mostrarDescuento = true;
    }
    if(this.venta.categoriaPasajero == "j"){
      this.descuento = (this.venta.precioPasaje*50/100);
      this.precioActual = this.venta.precioPasaje - this.descuento;
      this.mostrarDescuento = true;
    }
    if(this.venta.categoriaPasajero == "a"){
      this.precioActual = this.venta.precioPasaje;
      this.mostrarDescuento = false;
    }
  }
}
