import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {


  urlApi= 'http://localhost:3000/api/transaccion';

  constructor(private _http : HttpClient) { }

  public getConversor(fromvalue:string,
    fromtype :string,totype:string):Observable<any> {
    const url='https://community-neutrino-currency-conversion.p.rapidapi.com/convert?';
    const httpOptions={
      headers:new HttpHeaders(
        {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com',
          'X-RapidAPI-Key': '36be3675d6mshf892d91c79900b4p15dae2jsnb32f44f30fd9'
        }),
        params : {
          'from-type':fromtype,
          'to-type': totype,
          'from-value':fromvalue
        }
    };
            return this._http.post(url,'from-type/to-type/from-value', httpOptions);
    }

  public nuevaTransaccion( transaccn : Transaccion){
    return this._http.post(this.urlApi,transaccn);
  }

  public transacciones(): Observable<any>{
    return this._http.get<Transaccion[]>(`${this.urlApi}`);
  }

  public buscarPorFiltros(monedOrigen : string , monedDestino : string){
    return this._http.get<Transaccion[]>(`${this.urlApi}/${monedOrigen}/${monedDestino}`)
  }

  public buscarPorEmail(email : string){
    return this._http.get<Transaccion[]>(`${this.urlApi}/${email}`)
  }
}
