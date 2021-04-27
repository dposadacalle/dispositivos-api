import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


// Importamos componente de Angular Material
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Importamos paquete de Google Maps
import { GoogleMapsModule } from '@angular/google-maps';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CandadoDetalleComponent } from './components/candado-detalle/candado-detalle.component';
import { AddCandadoComponent } from './components/add-candado/add-candado.component';
import { CandadosComponent } from './components/candados/candados.component';

import { APP_ROUTING } from './app.routes';
import { GooglemapsComponent } from './components/googlemaps/googlemaps.component';
import { MostrarDispositivosComponent } from './components/mostrar-dispositivos/mostrar-dispositivos.component';
import { ComandosComponent } from './components/comandos/comandos.component';
import { EnviarComandoComponent } from './components/enviar-comando/enviar-comando.component';
import { ReporteTramasComponent } from './components/reporte-tramas/reporte-tramas.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CandadoDetalleComponent,
    AddCandadoComponent,
    CandadosComponent,
    GooglemapsComponent,
    MostrarDispositivosComponent,
    ComandosComponent,
    EnviarComandoComponent,
    ReporteTramasComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING, 
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule, 
    GoogleMapsModule,
    BrowserAnimationsModule,

    // IMportamos modulos de Angular Material (DatePicker)
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
