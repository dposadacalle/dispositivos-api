import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Trama } from '../models/trama.model';

@Injectable({
  providedIn: 'root'
})
export class TramasService {

  tramas : Trama[]; 

  objTramas : {};

  selectedTramas : Trama = {
    terminalID: 0,
    latitud: 0, 
    longitud: 0, 
    fechaInicio: "", 
    fechaFin: "", 
    candado : ""

  }

  API_URL_TRAMA = 'http://localhost:3000/reporteTramas';

  constructor(private httpClient: HttpClient) { }

  listarTramas(){
    return this.httpClient.get<Trama[]>(`${this.API_URL_TRAMA}/mostrarTramas`);
  }

  consultarTrama(trama : Trama){
    return this.httpClient.post<Trama[]>(`${this.API_URL_TRAMA}/consultarTrama`, trama);
  }

}
