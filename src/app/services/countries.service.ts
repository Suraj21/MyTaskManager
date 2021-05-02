import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
      return this.httpClient.get<Country[]>("https://localhost:44316/api/countries/GetCountries", { responseType:  "json"});
  }

}
