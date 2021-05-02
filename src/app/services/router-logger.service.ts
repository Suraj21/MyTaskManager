import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {

  private httpClient: HttpClient;
  currentUserName: string = null;4

  constructor(private httpBackend: HttpBackend) { }

  public log(logMsg: string):Observable<any>{
       return new Observable( observer => {
         console.log(logMsg);
         observer.next('Logged Successfully')

         observer.complete();
       });
  }
}
