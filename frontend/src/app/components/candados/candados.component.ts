import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

import {ButtonModule} from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';

import { CandadoService } from '../../services/candado-services.service';
import { Candado } from '../../models/candado.model';


@Component({
  selector: 'app-candados',
  templateUrl: './candados.component.html', 
  providers: [CandadoService]
})
export class CandadosComponent implements OnInit {

  constructor(public candadoService: CandadoService, 
              private router : Router, private primengConfig: PrimeNGConfig) { 
    this.primengConfig.ripple = true;
  }

  titulo = "Nuevo Candado";

  str : string;

  isEditing : boolean = false; 

  isEditingEstadoCerrojo : boolean = false; 

  isEditingUltimoRegistro : boolean = false; 

  // NgOnINit : Ejecuta cuando carga la aplicacion
  ngOnInit(): void {
    this.getCandados();
  }

  getCandados(){
    this.candadoService.getAll().subscribe((res: any) => {
      console.log(res.data);
      this.candadoService.candados = res.data;
    });
  }

  mostrarEstado(estado: string) : boolean {
    
    return estado == 'Abierto';

  }

  verDetalleCandado(candado: Candado){
    this.router.navigate(['/candados', candado._id]);
  }

  addCandado(candadoForm: NgForm){
    console.log(candadoForm.value._id);
    if(candadoForm.value._id){// Si tiene un ID significa  que se actualiza
      console.log('Actualizando');
      console.log(this.isEditing);

      if(this.isEditingUltimoRegistro == false){
        console.log('Actualizando Ultimo registro');
        this.candadoService
          .updateUltimoRegistro(candadoForm.value)
          .subscribe(
            data => {
              this.limpiarCampos(candadoForm), 
              this.getCandados()
            },
            err => {
              console.log(err)
            }
          )
        
      }

      if(this.isEditingEstadoCerrojo == false){
        console.log('Actualizando Estado Cerrojo');
        this.candadoService
          .updateEstadoCerrojo(candadoForm.value)
          .subscribe(
            res => {
              this.limpiarCampos(candadoForm);
              this.getCandados();
            },
            err => console.log(err)
          );
      }

    }else{
      this.candadoService.createCandado(candadoForm.value).subscribe(
        res => {
          // Se llama nuevamente ala funcion, actualice el contenido de la tabla, 
          // Al obtener nuevamente la data
          this.getCandados();
          this.limpiarCampos(candadoForm);
          
        }, 
        err => console.log(err)
      );
    }
  }

  actualizarUltimoRegistro(candado : Candado){
    console.log('Actualizando Ultimo Registro');
    this.candadoService.selectedCandado = candado;
    console.log(candado);
    this.isEditing = true; 
    this.isEditingUltimoRegistro = false;
    console.log(`Actualizar Ultimo Registro ${this.isEditingUltimoRegistro}`);
    this.isEditingEstadoCerrojo = true;
    console.log(`Actualizar Estado Cerrojo ${this.isEditingEstadoCerrojo}`);
  }

  actualizarEstadoCerrojo(candado : Candado){
    console.log('Actualizando Estado');
    this.candadoService.selectedCandado = candado;
    console.log(candado);
    this.isEditingEstadoCerrojo = false; 
    console.log(`Actualizar Estado Cerrojo ${this.isEditingUltimoRegistro}`);
    this.isEditingUltimoRegistro = true;
    console.log(`Actualizar Ultimo Registro ${this.isEditingEstadoCerrojo}`);
    console.log(this.isEditingEstadoCerrojo);
    this.isEditing = true; 
  }

  limpiarCampos(candadoForm : NgForm){
   if(candadoForm){
      candadoForm.reset();
      this.isEditing = false; 
      this.isEditingEstadoCerrojo = false; 
      this.isEditingUltimoRegistro = false;
   }
  }

}
