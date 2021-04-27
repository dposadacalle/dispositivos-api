import { Component, OnInit, Input } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-candado-detalle',
  templateUrl: './candado-detalle.component.html'
})
export class CandadoDetalleComponent implements OnInit {

  @Input() candado : any = {};
  @Input() index : string; 

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  verCandadoDetalle(){
    this.router.navigate(['/candado', this.index]);
  }

}
