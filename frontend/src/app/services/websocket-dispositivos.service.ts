import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';

import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketDispositivosService {
  
  private socket: any;

  constructor() { 

    this.socket = io('http://localhost:3000');

    console.log('this.socket :>> ', this.socket);
  }

  public recibirUbicacion(): Observable<any> {

    return Observable.create((observable: any) => {

        this.socket
          .on('reporteUbicacion', (d: any) => {
            observable.next(d);
          });
      }
    );
  }

  public recibirLocalizacion(): Observable<any> {

    return Observable.create((observable: any) => {

        this.socket
          .on('reporteLocalizacion', (d: any) => {
            observable.next(d);
          });
      }
    );
  }
}
