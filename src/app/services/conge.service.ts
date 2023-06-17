import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge';

const baseUrl = 'http://localhost:8081/api/conge'
@Injectable()
export class CongeService {
constructor(private httpClient : HttpClient) { }


getCredit():Observable<Conge[]> {
    const url = `${baseUrl}/all`
  return this.httpClient.get<Conge[]>(url);
}


}
