import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { WebsocketDispositivosService } from '../../services/websocket-dispositivos.service';
import { CandadoService } from '../../services/candado-services.service';
import { Candado } from '../../models/candado.model';

declare var google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})

export class GooglemapsComponent implements OnInit {
  
  // Definimos Una Propiedades
  map : any;
  markers: any = []; 
  loader: Loader; 

  constructor(public candadoService: CandadoService, 
      private socketService: WebsocketDispositivosService) {
        // this.subscripciones();
        this.subscripcionesRecibidas();
  }
  
  ngOnInit(): void { 
    this.inicializarMapa();
  }

  private inicializarMapa(): void{
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });

      // this.getCandados();
      this.obtenerDispositivos();
  }  

  // private subscripciones(): void {
    
  //   this.socketService
  //   .recibirUbicacion()
  //     // tslint:disable-next-line: deprecation
  //     .subscribe((d: any) => {
  //         // debugger;
  //         console.log('información recibida :>> ', d);

  //         let posMarcador = this.markers.findIndex(x=> x._id == d._id)
          
  //         // -1 Indica que no hay elementos en el array, 
  //         // Con posMarcador > -1: Al menos una posicion creada.
  //         if (posMarcador > -1) {
  //           let marcador = this.markers[posMarcador];
  //           let posiciones = d.posiciones;
            
  //           marcador.marker.setPosition({
  //             lat: posiciones.latitud,
  //             lng: posiciones.longitud
  //           });
  //         }
  //     });
  // }

  public subscripcionesRecibidas() : void{
  
    this.socketService
      .recibirLocalizacion()
      .subscribe((d:any) => {
        console.log('información Localizacion  :>> ', d);

        let posMarcador = this.markers.findIndex(x => x.terminalID == d.idCandado)

        if (posMarcador > -1) {
          let marcador = this.markers[posMarcador];
          let posiciones = d.posiciones;
          
          marcador.marker.setPosition({
            lat: posiciones.latitud,
            lng: posiciones.longitud
          });
        }
      });
  }

  obtenerDispositivos(){
    this.candadoService.getAll().subscribe((res:any)=>{
      this.candadoService.candados = res.data;

      // En la variable, guardo el arreglo candados
      let dispositivosLocalizados = this.candadoService.candados;

      // Valido que exista un dispositivo creado
      if(dispositivosLocalizados.length > 0){
        
        dispositivosLocalizados.forEach(dispositivo => {

          let ubicacion = {
            lat: dispositivo.laptitud, 
            lng: dispositivo.longitud
          };
          
          this.agregarMarcador(dispositivo, ubicacion);
        })
      }
    })
  }

  getCandados(){
    this.candadoService.getAll().subscribe((res: any) => {
      this.candadoService.candados = res.data;

      // Guardamos los candados en una variable local
      let candadosMapa = this.candadoService.candados;

      // Preguntamos si existe al menos un candado
      if (candadosMapa.length > 0) {

        // Recorremos la lista de candados encontrados
        candadosMapa.forEach(candado => {

          // Sacamos una variable con los últimos puntos
          let ultimosPuntos = candado.ultimosPuntos;

          // Preguntamos si hay al menos un punto registrado en el candado
          if (ultimosPuntos.length > 0) {

            // Obtenemos las coordenadas
            let coordenadas = ultimosPuntos[ultimosPuntos.length - 1].localizacion.coordinantes;
            let ubicacion = {
              lat: coordenadas[1],
              lng: coordenadas[0]
            }

            this.agregarMarcador(candado, ubicacion);
                     
          }
        });
      }
    });
  }

  // Este metodo permite agregar un nuevo marque al mapa, 
  // lepasamos como argumento el candado y ubicacion en esa ubicacion Del Array 
  agregarMarcador(candado, ubicacion) {

    const image = {
      url: candado.imagen,
      size: new google.maps.Size(80, 80),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(30, 30)
    };

    const marker = new google.maps.Marker({
      position: ubicacion,
      map: this.map,
      title: candado.nombre, 
      icon: image
    });

    // Agregamoscon push al Array markerts, una   objeto en cada posicion,
    // le definimos un id y el market creado en es epunto delmapa
    this.markers.push({
      // _id: candado._id,
      terminalID: candado.terminalID,
      marker
    });

  }

  



}