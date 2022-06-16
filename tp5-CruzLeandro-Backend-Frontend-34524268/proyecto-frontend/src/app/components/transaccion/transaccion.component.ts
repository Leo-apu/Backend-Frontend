import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  transaccion! : Transaccion;
  transacciones! : Array<Transaccion>;
  conversion={
    
    "fromvalue":'',
    "fromtype":'',
    "totype":'',
    "email":'',
    "result": ''
  }

  origen! : string;
  destino!: string;
  email!: string;
  resultado!: string;

  constructor(private transaccionService : TransaccionService) { }

  convertir(){
    console.log(this.conversion.fromvalue);
    console.log(this.conversion.fromtype);
    console.log(this.conversion.totype);
    this.transaccionService.getConversor(this.conversion.fromvalue,this.conversion.fromtype,this.conversion.totype).subscribe(
      (result)=> {
        console.log(result);        
        this.resultado = result.result;
        this.conversion.result = this.resultado;
        console.log(this.conversion);
        this.nuevaTransaccion();
      }
    )
  }


  nuevaTransaccion(){
    this.transaccion = new Transaccion();
    this.transaccion.monedaOrigen = this.conversion.fromtype;
    this.transaccion.cantidadOrigen = parseInt(this.conversion.fromvalue);
    this.transaccion.monedaDestino = this.conversion.totype;
    this.transaccion.cantidadDestino = parseFloat(this.conversion.result);
    this.transaccion.emailCliente = this.conversion.email;
    this.transaccion.tasaConversion = this.transaccion.cantidadDestino/this.transaccion.cantidadOrigen;

    console.log(this.transaccion);
    
    this.transaccionService.nuevaTransaccion(this.transaccion).subscribe(
      (result)=> {
        console.log(result);
        this.mostrarTransacciones();
        this.limpiarFlitros();
      }
    )
  }
  
  mostrarTransacciones(){
    this.transaccionService.transacciones().subscribe(
      (result)=> {
        this.transacciones = result;
      }
    )
    this.limpiarFlitros();
  }

  limpiarFlitros(){
    this.conversion.fromvalue='';
    this.conversion.fromtype='';
    this.conversion.email='';
    this.conversion.totype='';
    this.resultado='';
    this.origen='';
    this.destino='';
    this.email='';
  }

  filtrar(){
    if (this.email) {
      
      console.log('hay email');
      this.buscarPorEmail();
    } else if (!this.origen || !this.destino) {
      this.mostrarTransacciones();
      alert('Debe seleccion moneda de Origen y moneda de Destino')
      
    } else {
      console.log('no hay email');
      this.buscarPorFiltro();
    }
    this.limpiarFlitros();
  }

  buscarPorFiltro(){
    this.transaccionService.buscarPorFiltros(this.origen,this.destino).subscribe(
      (result)=> {
        this.transacciones = result;
      }
    )
  }
  buscarPorEmail(){
    this.transaccionService.buscarPorEmail(this.email).subscribe(
      (result)=> {
        this.transacciones = result;
      }
    )
  }

  ngOnInit(): void {
      this.mostrarTransacciones();
  }

}
