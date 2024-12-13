import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallingAPIBackEndService {

  private apiUrl = 'http://localhost:8088/api/testing/message';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<string>(this.apiUrl, { responseType: 'text' as 'json' });
  }
}
