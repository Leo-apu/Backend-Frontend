import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  urlApi= 'http://localhost:3000/api/';
  constructor(private _http: HttpClient) { }

  crearLibros(libro : Libro): Observable<any>{
    return this._http.post(this.urlApi+'libro',libro);
  }

  mostrarDestacados(): Observable<any>{
    const httpOptions ={
      headers : new HttpHeaders(),
      params : (new HttpParams())
    }
    return this._http.get<Libro[]>(this.urlApi+'libro/activo',httpOptions);
  }
  mostrarTodos(){
    return this._http.get<Libro[]>(this.urlApi+'libro');
  }
}
