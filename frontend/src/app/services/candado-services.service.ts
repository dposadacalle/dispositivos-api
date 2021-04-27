import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Candado} from '../models/candado.model';

@Injectable({
  providedIn: 'root'
})
export class CandadoService {

  candados: Candado[];

  selectedCandado: Candado = {
    nombre: "", 
    laptitud: 0, 
    longitud: 0, 
    ultimoRegistro: "", 
    estadoCerrojo: "",
    terminalID: 0
  };
  
  API_URL = 'http://localhost:3000/candados';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Candado[]>(this.API_URL);
  }

  obtenerCandado(id: string) {
    return this.http.get(`${this.API_URL}/verDetalle/${id}`);
  }

  createCandado(data : Candado){
    console.log(data);
    return this.http.post(`${this.API_URL}/add`, data);
  }

  updateUltimoRegistro(candado : Candado) {
    console.log(candado);
    return this.http.put(`${this.API_URL}/actualizarUltimoRegistro/${candado._id}`, candado)
  }

  updateEstadoCerrojo(candado: Candado){
    console.log(candado);
    return this.http.put(`${this.API_URL}/actualizarEstado/${candado._id}`, candado);
  }

  actualizarIconoCandado(candado : Candado){
    console.log(candado);
    return this.http.put(`${this.API_URL}/actualizarIconoMarketCandado/${candado._id}`, candado);
  }


}



