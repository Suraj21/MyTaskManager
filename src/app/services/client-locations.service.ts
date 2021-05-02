import { ClientLocation } from './../models/client-location'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationsService {

  constructor(private httpClient: HttpClient) { }

  getClientLocations(): Observable<ClientLocation[]> {
    return this.httpClient.get<ClientLocation[]>("https://localhost:44316/api/ClientLocations",{responseType: "json"});
  }
}
