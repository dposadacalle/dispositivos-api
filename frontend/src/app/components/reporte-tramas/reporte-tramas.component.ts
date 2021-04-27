import { Component , OnInit, ViewChild} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Loader } from '@googlemaps/js-api-loader';
import { FormControl, NgForm } from '@angular/forms';
import { DateTime } from 'luxon';

import { CandadoService } from '../../services/candado-services.service';
 
import { TramasService } from '../../services/tramas.service';

declare var google: any;

@Component({
  selector: 'app-reporte-tramas',
  templateUrl: './reporte-tramas.component.html', 
  styleUrls: ['./reporte-tramas.component.css']
})

export class ReporteTramasComponent implements OnInit {

  map : any;
  markers: any = []; 
  loader: Loader; 

  constructor(public candadoService: CandadoService, public tramaService: TramasService) {
    this.getCandados();
    this.getTramas();
   }

  ngOnInit(): void {
    this.initMapa();
  }

  private initMapa() : void{
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });

    this.getTramas();
  }

  getCandados(){
    this.candadoService.getAll().subscribe((res: any) => {
      console.log(res.data);
      this.candadoService.candados = res.data;
    });
  }

  getTramas(){
    this.tramaService.listarTramas().subscribe((res: any) => {
      console.log(res.data);
      this.tramaService.tramas = res.data; 
    });
  }

  consultarTrama(tramaForm : NgForm){
    
    console.log(DateTime.fromISO(tramaForm.value.fechaInicio));

    tramaForm.value.fechaInicio = DateTime.fromISO(tramaForm.value.fechaInicio, {zone: 'utc'});

    tramaForm.value.fechaFin = DateTime.fromISO(tramaForm.value.fechaFin, {zone: 'utc'});
    
    this.tramaService.consultarTrama(tramaForm.value).subscribe((res: any) => {
    
      this.tramaService.tramas = res.data;

      console.log(this.tramaService.tramas);

      // Guardamos las tramas en un variable local
      let tramasMapa = this.tramaService.tramas;

      let coordenadas = [];
      
      for(let i=0; i<tramasMapa.length; i++){
        coordenadas[i] = {lat: tramasMapa[i].latitud, lng: tramasMapa[i].longitud}
      }

      console.log(coordenadas);

      const flightPath = new google.maps.Polyline({
        path: coordenadas,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      flightPath.setMap(this.map); 

      
    
    })
  }

  
  

}
