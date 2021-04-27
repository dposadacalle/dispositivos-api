import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ComandoService } from '../../services/comando.service';
import { CandadoService } from '../../services/candado-services.service';

@Component({
  selector: 'app-enviar-comando',
  templateUrl: './enviar-comando.component.html'
})
export class EnviarComandoComponent implements OnInit {
  
  obj = {
    mensaje: '',
    err: false,
    tieneRes: false
  };

  constructor(public comandoService : ComandoService, 
              public candadoService: CandadoService) { }

  ngOnInit(): void {
    this.obtenerComandos();
    this.getCandados();
  }

  obtenerComandos(){
    this.comandoService.listarComandos().subscribe((res:any)=>{
      console.log(res.data);
      this.comandoService.comandos = res.data;
    });
  }

  getCandados(){
    this.candadoService.getAll().subscribe((res: any) => {
      console.log(res.data);
      this.candadoService.candados = res.data;
    });
  }

  enviarComando(comando : NgForm){  
    try {
      // console.log(Object.keys(comando.value).length === 0);
      // console.log(Object.entries(comando.value).length);

      this.comandoService.enviarComando(comando.value).subscribe((res:any) => {
        if(!res.eror)
          this.obj.tieneRes = true;
          this.obj.mensaje = res.mensaje;
          this.obj.err = res.error;
      }, (err:any) => {
        this.obj.err = err.error; 
        this.obj.mensaje = err.error.mensaje;
        this.obj.tieneRes = true;
      });
      
    } catch (error) {
      console.log(error);
    } 
  }

}
