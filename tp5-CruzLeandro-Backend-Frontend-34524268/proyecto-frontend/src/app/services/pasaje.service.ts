import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pasaje } from '../models/pasaje';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  urlApi= 'http://localhost:3000/api/pasaje/';

  constructor(private _http : HttpClient) { }


  pasajeCategoria(categoria: string) {
    return this._http.get<Pasaje[]>(`${this.urlApi}?categoria=${categoria}`);
  }

  traerPasajes(){
    return this._http.get<Pasaje[]>(`${this.urlApi}`);
  }
  agregarPasaje(pasaje: Pasaje): Observable<any>{
    return this._http.post(this.urlApi,pasaje);
  }
  modifPasaje(id : string, pasaje : Pasaje){
    return this._http.put<Pasaje>(this.urlApi+id,pasaje);
  }
  elimPasaje(id: string): Observable<any>{
    return this._http.delete(this.urlApi+id);
  }
  obtenerPasaje(id:string): Observable<any>{
    return this._http.get<Pasaje>(this.urlApi+id);
  }
  traerPersonas(){
    return this._http.get<Persona[]>('http://localhost:3000/api/persona')
  }
}
