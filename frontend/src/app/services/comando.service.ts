import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comando } from '../models/comando.model';

@Injectable({
  providedIn: 'root'
})
export class ComandoService {
  
  comandos : Comando[];

  selectedComando : Comando = {
    terminalID: 0,
    nombre: ""
  };

  API_URL_COMANDO = 'http://localhost:3000/comandos';

  constructor(private http : HttpClient) { }
  
  listarComandos(){
    return this.http.get<Comando[]>(this.API_URL_COMANDO);
    
  }

  enviarComando(data : any) {
      return this.http.post(`${ this.API_URL_COMANDO }/enviarComando`, data);
  }

}
