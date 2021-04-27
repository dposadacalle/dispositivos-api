import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { CandadoService } from '../../services/candado-services.service';

import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-add-candado',
  templateUrl: './add-candado.component.html'
})
export class AddCandadoComponent implements OnInit {

  titulo = "Dar de Alta un Nuevo Candado";

  @Output() candado = new EventEmitter<any>();

  @Input() item : any;
  
  isEditing : boolean = false; 

  isEditingEstadoCerrojo : boolean = false; 

  isEditingUltimoRegistro : boolean = false; 

  constructor(public candadoService : CandadoService) { }

  ngOnInit(): void {
  }

  addCandado(form : NgForm){
    this.candado.emit(form);
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
