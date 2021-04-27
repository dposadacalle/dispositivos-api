import {RouterModule, Routes} from '@angular/router';

// Importamos los componentes
import { HomeComponent } from './components/home/home.component';
import { AddCandadoComponent } from './components/add-candado/add-candado.component';
import { CandadosComponent } from './components/candados/candados.component';
import { CandadoDetalleComponent } from './components/candado-detalle/candado-detalle.component';
import { GooglemapsComponent } from './components/googlemaps/googlemaps.component';
import { ComandosComponent } from './components/comandos/comandos.component';
import { EnviarComandoComponent } from './components/enviar-comando/enviar-comando.component';
import { ReporteTramasComponent } from './components/reporte-tramas/reporte-tramas.component';

const APP_ROUTES : Routes = [
    { path: '', redirectTo: 'candados', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'add', component: AddCandadoComponent },
    { path: 'nuevoComando', component: ComandosComponent },
    { path: 'enviarComando', component: EnviarComandoComponent },
    { path: 'candados', component: CandadosComponent },   
    { path: 'candados/:id', component: CandadoDetalleComponent },
    { path: 'mostrarDispositivos', component: GooglemapsComponent },
    { path: 'reporteTramas', component: ReporteTramasComponent }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);